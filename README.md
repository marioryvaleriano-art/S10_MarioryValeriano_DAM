# 🛒 Formulario de Registro de Producto

![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)

Formulario interactivo para **Desarrollo de Aplicaciones Móviles** (S10 | AP5). Hecho con React Native y Expo.

---

## ¿De qué trata?

Es una app que te permite **registrar un producto** llenando un formulario con nombre, precio, categoría y stock. Lo importante es que valida los datos en tiempo real: si algo está mal, te avisa; si todo está bien, te felicita. 🎉 Sin bases de datos ni servidores, solo estados y buenas validaciones.

## 🛒 La opción que elegí

**Registro de Producto**, con estos campos:

| Campo | Validación |
| :--- | :--- |
| Nombre | Obligatorio |
| Precio | Mayor a 0 |
| Categoría | Tienes que elegir una |
| Stock | Valor válido |

## ✅ Lo que validé

- El nombre no puede estar vacío.
- El precio tiene que ser mayor a 0.
- El stock debe ser un número válido.
- La categoría es obligatoria.

## 🧠 Lo que usé

- `TextInput` para escribir los datos.
- `useState` para manejar el estado de cada campo.
- `onChangeText` para validar mientras escribes.
- `Pressable` para el botón de enviar.
- Mensajes de error cuando algo falla y de éxito cuando todo sale bien.

## 📸 Evidencias

| Captura | Qué muestra |
| :--- | :--- |
| **1** | El formulario listo para llenar. |
<img width="715" height="1600" alt="image" src="https://github.com/user-attachments/assets/6077967a-5d1a-467e-849d-931f5630470c" />

| **2** | Datos incorrectos con mensajes de que esta correcto. |
<img width="715" height="1600" alt="image" src="https://github.com/user-attachments/assets/10a0d4c3-5d0c-418d-89e2-924a437ce2be" />

| **3** | Datos válidos y mensaje de prodcuto registrado. |
<img width="720" height="1429" alt="image" src="https://github.com/user-attachments/assets/a21ba77a-eb32-4021-8a30-6e623b475342" />


## 🚀 Para correrlo

```bash
npm install
npx expo start
