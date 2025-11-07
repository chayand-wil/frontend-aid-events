import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../axios";

export function useRegistroUsuario() {
  const router = useRouter();

  const focus_name = ref(false);
  const focus_lastname = ref(false);
  const focus_mail = ref(false);
  const focus_password = ref(false);
  const focus_username = ref(false);

  const mensaje = ref("");
  const error = ref("");

  const nuevo = ref(getDefaultNuevo());

  // Función para limpiar
  function limpiarNuevo() {
    nuevo.value = getDefaultNuevo();
  }

  function getDefaultNuevo() {
    return {
      username: "",
      email: "",
      name: "",
      lastname: "",
      // password: 'admin123',
      password: "",
      // id_rol: 2,
      // id_estado: 1,
      // id_genero: 2,
    };
  }

  const crearUsuario = async () => {
    mensaje.value = "";
    error.value = "";
    try {
      const response = await api.post("/register", nuevo.value);
      console.log(response.data.message);
      mensaje.value = response?.data?.message || "Usuario creado con éxiiiiito";
      // if (response.status === 201) {
      const em = nuevo.value.email;
      router.push({ name: "activate", params: { email: em } });

      setTimeout(() => {
        mensaje.value = "";
      }, 5000);

      // Si el usuario es creado con éxito, proceder con el

      // registro si no es admin
      // if (!localStorage.getItem('id')) {
      // activacion de la cuenta
      // alert(em)

      // login despues de la activacion
      // await login()
      // }
      // limpiarNuevo()
      // }
    } catch (e) {
      console.log(e);
      error.value = e.response?.data?.message || "Error al crear el usuario";
      const errores = e.response.data.errors;
      // error.value = ' Error: ' + Object.values(errores).flat().join(', ')
      setTimeout(() => {
        mensaje.value = "";
        error.value = "";
      }, 3000);
    }
  };

  const login = async () => {
    try {
      // const response = await api.post('/login', {
      //   email: nuevo.value.email,
      //   password: nuevo.value.password,
      // })

      // const token = response.data.access_token
      // const role = response.data.user.rol.slug
      // const id = response.data.user.id

      // localStorage.setItem('token', token)
      // localStorage.setItem('role', role)
      // localStorage.setItem('id', id)
      // const role = 'admin'

      switch (role) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "ACTIVE":
          router.push("/comun_user");
          break;

        default:
          router.push("/");
      }
    } catch {
      error.value = "Credenciales incorrectas";
    }
  };

  return {
    nuevo,
    mensaje,
    error,
    focus_name,
    focus_lastname,
    focus_mail,
    focus_password,
    focus_username,
    crearUsuario,
  };
}
