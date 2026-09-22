import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import FormInput from "./components/formInput";
import FormSelect from "./components/formSelect";
import FormTextArea from "./components/formTextArea";
import FormFile from "./components/formFile";

import toast from "react-hot-toast";

function ContactoForm() {
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",

    defaultValues: {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      genero: "",
      pais: "",
      ciudad: "",
      correo: "",
      telefono: "",
      mensaje: "",
      archivo: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setEnviando(true);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "archivo" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("archivo", file);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(
        import.meta.env.VITE_FORMSPREE_ENDPOINT,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Datos del formulario:", data);

        toast.success("¡Formulario enviado exitosamente!");

        reset();
      } else {
        const textoRespuesta = await response.text();

        let mensajeError =
          "Ocurrió un error al enviar el formulario";

        if (textoRespuesta) {
          try {
            const resultado = JSON.parse(textoRespuesta);

            mensajeError = resultado.errors
              ? resultado.errors
                  .map((e) => e.message)
                  .join(", ")
              : mensajeError;
          } catch (error) {
            console.error(
              "La respuesta del servidor no es JSON:",
              error
            );
          }
        }

        toast.error(mensajeError);
      }
    } catch (error) {
      console.error(
        "Error de red al enviar el formulario:",
        error
      );

      toast.error(
        "No se pudo enviar. Revisa tu conexión e intenta de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-md"
    >
      {/* Datos personales */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Primer Nombre */}
        <FormInput
          label="Primer Nombre"
          placeholder="Escribe tu primer nombre"
          error={errors.primerNombre?.message}
          {...register("primerNombre", {
            required: "El primer nombre es obligatorio",
          })}
        />

        {/* Segundo Nombre */}
        <FormInput
          label="Segundo Nombre"
          placeholder="Escribe tu segundo nombre"
          error={errors.segundoNombre?.message}
          {...register("segundoNombre")}
        />

        {/* Primer Apellido */}
        <FormInput
          label="Primer Apellido"
          placeholder="Escribe tu primer apellido"
          error={errors.primerApellido?.message}
          {...register("primerApellido", {
            required: "El primer apellido es obligatorio",
          })}
        />

        {/* Segundo Apellido */}
        <FormInput
          label="Segundo Apellido"
          placeholder="Escribe tu segundo apellido"
          error={errors.segundoApellido?.message}
          {...register("segundoApellido")}
        />

        {/* Género */}
        <FormSelect
          label="Género"
          options={["Femenino", "Masculino", "Otro"]}
          error={errors.genero?.message}
          {...register("genero", {
            required: "El género es obligatorio",
          })}
        />

        {/* País */}
        <FormSelect
          label="País"
          options={[
            "Colombia",
            "Argentina",
            "Chile",
            "México",
            "Perú",
          ]}
          error={errors.pais?.message}
          {...register("pais", {
            required: "El país es obligatorio",
          })}
        />

        {/* Ciudad */}
        <FormSelect
          label="Ciudad"
          options={[
            "Medellín",
            "Girardota",
            "Copacabana",
            "Bogotá",
            "Cali",
            "Otro",
          ]}
          error={errors.ciudad?.message}
          {...register("ciudad", {
            required: "La ciudad es obligatoria",
          })}
        />

        {/* Correo */}
        <FormInput
          label="Correo"
          type="email"
          placeholder="ejemplo@correo.com"
          error={errors.correo?.message}
          {...register("correo", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          })}
        />

        {/* Teléfono */}
        <FormInput
          label="Teléfono"
          type="tel"
          placeholder="300 000 0000"
          error={errors.telefono?.message}
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "El teléfono debe tener 10 dígitos",
            },
          })}
        />
      </div>

      {/* Mensaje */}

      <div className="mt-6">
        <FormTextArea
          label="Mensaje"
          placeholder="Mensaje"
          error={errors.mensaje?.message}
          {...register("mensaje", {
            required: "El mensaje es obligatorio",
          })}
        />
      </div>

      {/* Archivos */}

      <div className="mt-6">
        <Controller
          name="archivo"
          control={control}
          render={({ field }) => (
            <FormFile
              label="Adjuntar archivos"
              name="archivo"
              accept={{
                "application/pdf": [".pdf"],
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
                "video/*": [],
              }}
              maxSizeMB={5}
              maxFiles={3}
              onFilesChange={field.onChange}
              error={errors.archivo?.message}
            />
          )}
        />
      </div>

      {/* Botón */}

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={enviando}
          className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;