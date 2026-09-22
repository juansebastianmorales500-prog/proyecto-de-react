import { useDropzone } from "react-dropzone";
import { useState, useEffect, useRef } from "react";
import "./FormFile.css";

function FormFile({
  label,
  name,
  required = false,
  error = "",
  onFilesChange = () => {},
  accept = {
    "application/pdf": [".pdf"],
  },
  maxSizeMB = 2,
  maxFiles = 3,
}) {
  const [archivos, setArchivos] = useState([]);
  const archivosRef = useRef([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  const espacioDisponible = maxFiles - archivos.length;
  const limiteAlcanzado = espacioDisponible <= 0;

  const generarId = (file) => {
    return `${file.name}-${file.lastModified}-${file.size}`;
  };

  const onDrop = (acceptedFiles, fileRejections) => {
    setErrorMsg("");

    if (fileRejections.length > 0) {
      const rechazados = fileRejections.map(
        ({ file, errors }) =>
          `${file.name}: ${errors
            .map((error) => error.message)
            .join(", ")}`
      );

      setErrorMsg(rechazados.join(" | "));
    }

    if (espacioDisponible <= 0) {
      setErrorMsg(
        `Ya alcanzaste el máximo de ${maxFiles} archivos`
      );
      return;
    }

    const archivosDisponibles = acceptedFiles.slice(
      0,
      espacioDisponible
    );

    const nuevosArchivos = archivosDisponibles.map((file) => ({
      id: generarId(file),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setArchivos((anteriores) => [
      ...anteriores,
      ...nuevosArchivos,
    ]);

    if (acceptedFiles.length > espacioDisponible) {
      setErrorMsg(
        `Solo puedes agregar ${espacioDisponible} archivo${
          espacioDisponible > 1 ? "s" : ""
        }. El máximo es de ${maxFiles}.`
      );
    }
  };

  const eliminarArchivo = (id) => {
    setArchivos((anteriores) => {
      const archivoAEliminar = anteriores.find(
        (archivo) => archivo.id === id
      );

      if (archivoAEliminar?.preview) {
        URL.revokeObjectURL(archivoAEliminar.preview);
      }

      if (archivoAEliminar) {
        setMensajeEliminado(
          `Archivo "${archivoAEliminar.file.name}" eliminado`
        );
      }

      return anteriores.filter(
        (archivo) => archivo.id !== id
      );
    });
  };

  // Mostrar mensaje de eliminación durante 3 segundos
  useEffect(() => {
    if (!mensajeEliminado) return;

    const temporizador = setTimeout(() => {
      setMensajeEliminado("");
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [mensajeEliminado]);

  // Cada vez que la lista cambia, avisamos hacia afuera
  useEffect(() => {
    onFilesChange(archivos.map((a) => a.file));
  }, [archivos, onFilesChange]);

  useEffect(() => {
    archivosRef.current = archivos;
  }, [archivos]);

  // Limpiar las previews cuando se desmonta el componente
  useEffect(() => {
    return () => {
      archivosRef.current.forEach((archivo) => {
        if (archivo.preview) {
          URL.revokeObjectURL(archivo.preview);
        }
      });
    };
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
    disabled: limiteAlcanzado,
    noClick: true,
  });

  return (
    <div className="form-file">
      <label
        htmlFor={name}
        className="form-file__label"
      >
        {label}
        {required && <span> *</span>}
      </label>

      <div
        {...getRootProps()}
        className={`form-file__dropzone ${
          isDragActive
            ? "form-file__dropzone--active"
            : ""
        } ${
          limiteAlcanzado
            ? "form-file__dropzone--disabled"
            : ""
        }`}
      >
        <input
          {...getInputProps({
            required: required && archivos.length === 0,
          })}
          id={name}
          name={name}
        />

        {limiteAlcanzado ? (
          <p>
            Ya alcanzaste el máximo de {maxFiles} archivos.
          </p>
        ) : (
          <>
            <button
              type="button"
              className="form-file__add"
              onClick={open}
            >
              📎 Agregar archivo
            </button>

            {isDragActive ? (
              <p>Suelta los archivos aquí...</p>
            ) : (
              <p>
                Arrastra tus archivos aquí o haz clic en
                "Agregar archivo".
              </p>
            )}

            <small>
              Puedes subir hasta {espacioDisponible} archivo
              {espacioDisponible > 1 ? "s" : ""}.
            </small>
          </>
        )}
      </div>

      {errorMsg && (
        <p className="form-file__error">
          {errorMsg}
        </p>
      )}

      {error && (
        <p className="form-file__error">
          {error}
        </p>
      )}

      {mensajeEliminado && (
        <p className="form-file__success">
          ✅ {mensajeEliminado}
        </p>
      )}

      {archivos.length > 0 && (
        <div className="form-file__list">
          {archivos.map(({ id, file, preview }) => (
            <div
              className="form-file__item"
              key={id}
            >
              {preview ? (
                <div className="form-file__preview">
                  <img
                    src={preview}
                    alt={`Vista previa de ${file.name}`}
                  />
                </div>
              ) : (
                <div className="form-file__icon">
                  📄
                </div>
              )}

              <div className="form-file__info">
                <strong>{file.name}</strong>

                <span>
                  Tipo: {file.type || "Desconocido"}
                </span>

                <span>
                  Tamaño:{" "}
                  {(file.size / 1024).toFixed(2)} KB
                </span>

                <span>
                  Modificado:{" "}
                  {new Date(
                    file.lastModified
                  ).toLocaleDateString()}
                </span>
              </div>

              <button
                type="button"
                className="form-file__delete"
                onClick={() => eliminarArchivo(id)}
                aria-label={`Eliminar ${file.name}`}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="form-file__counter">
        {archivos.length} de {maxFiles} archivos
      </p>
    </div>
  );
}

export default FormFile;