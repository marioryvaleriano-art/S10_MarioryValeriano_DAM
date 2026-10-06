import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';

import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';

import {
  validarNombre,
  validarPrecio,
  validarStock,
  validarCategoria,
} from '../utils/validators';

import { colors } from '../constants/colors';
import { theme } from '../constants/theme';

/* ------------------------------------------------------------------ */
/*  Constantes                                                          */
/* ------------------------------------------------------------------ */

const CATEGORIAS = ['Alimentos', 'Electrónica', 'Ropa', 'Hogar', 'Otros'];

/* ------------------------------------------------------------------ */
/*  Pantalla principal                                                  */
/* ------------------------------------------------------------------ */

export default function RegistroProducto() {

  // Estado de campos
  const [nombre, setNombre]       = useState('');
  const [precio, setPrecio]       = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock]         = useState('');

  // Estado de UI
  const [error, setError]           = useState('');
  const [registrado, setRegistrado] = useState(false);

  /* Validaciones derivadas — se recalculan en cada render */
  const nombreValido    = validarNombre(nombre);
  const precioValido    = validarPrecio(precio);
  const categoriaValida = validarCategoria(categoria);
  const stockValido     = validarStock(stock);

  /* Helper para limpiar mensajes al editar */
  const resetFeedback = () => {
    setError('');
    setRegistrado(false);
  };

  /* Envío del formulario */
  const handleGuardar = () => {
    resetFeedback();

    if (!nombreValido) {
      setError('El nombre del producto es obligatorio.');
      return;
    }

    if (!precioValido) {
      setError('El precio debe ser un número mayor a 0.');
      return;
    }

    if (!categoriaValida) {
      setError('Selecciona una categoría.');
      return;
    }

    if (!stockValido) {
      setError('El stock debe ser un número entero igual o mayor a 0.');
      return;
    }

    setRegistrado(true);

    // Limpiar formulario tras éxito
    setNombre('');
    setPrecio('');
    setCategoria('');
    setStock('');
  };

  /* Validaciones cumplidas (para el contador) */
  const validacionesCumplidas = [
    nombreValido,
    precioValido,
    categoriaValida,
    stockValido,
  ].filter(Boolean).length;

  /* ---------------------------------------------------------------- */
  /*  Render                                                            */
  /* ---------------------------------------------------------------- */

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ENCABEZADO ------------------------------------------------ */}

        <View style={styles.header}>

          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>
              +
            </Text>
          </View>

          <View>
            <Text style={styles.overline}>
              NUEVO REGISTRO
            </Text>
            <Text style={styles.title}>
              Registro de{'\n'}Producto
            </Text>
          </View>

        </View>

        <Text style={styles.description}>
          Completa los datos del producto. Todos los campos son obligatorios.
        </Text>


        {/* TARJETA DEL FORMULARIO ------------------------------------ */}

        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Información del producto
          </Text>

          <Text style={styles.sectionDescription}>
            Los campos marcados son requeridos.
          </Text>


          {/* NOMBRE -------------------------------------------------- */}

          <AppInput
            label="Nombre del producto *"
            placeholder="Ej: Arroz Integral 1kg"
            value={nombre}
            onChangeText={(value) => {
              setNombre(value);
              resetFeedback();
            }}
          />

          {nombre.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                nombreValido ? styles.validText : styles.invalidText,
              ]}
            >
              {nombreValido ? '✓ Nombre válido' : '○ Ingresa el nombre del producto'}
            </Text>
          )}


          {/* PRECIO -------------------------------------------------- */}

          <AppInput
            label="Precio (S/) *"
            placeholder="Ej: 12.50"
            value={precio}
            onChangeText={(value) => {
              // Solo dígitos y un único punto decimal
              const soloNumerico = value.replace(/[^0-9.]/g, '');
              const sinPuntosExtra = soloNumerico.replace(/^(\d*\.?\d*).*$/, '$1');
              setPrecio(sinPuntosExtra);
              resetFeedback();
            }}
            keyboardType="decimal-pad"
          />

          {precio.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                precioValido ? styles.validText : styles.invalidText,
              ]}
            >
              {precioValido ? '✓ Precio válido' : '○ Debe ser un número mayor a 0'}
            </Text>
          )}


          {/* CATEGORÍA ----------------------------------------------- */}

          <Text style={styles.chipLabel}>
            Categoría *
          </Text>

          <View style={styles.chipContainer}>
            {CATEGORIAS.map((cat) => {
              const seleccionada = categoria === cat;
              return (
                <Pressable
                  key={cat}
                  style={[
                    styles.chip,
                    seleccionada && styles.chipSelected,
                  ]}
                  onPress={() => {
                    setCategoria(cat);
                    resetFeedback();
                  }}
                >
                  <Text
                    style={[
                      styles.chipText,
                      seleccionada && styles.chipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {categoria.length > 0 && (
            <Text style={[styles.fieldStatus, styles.validText]}>
              ✓ Categoría seleccionada: {categoria}
            </Text>
          )}


          {/* STOCK --------------------------------------------------- */}

          <AppInput
            label="Stock (unidades) *"
            placeholder="Ej: 50"
            value={stock}
            onChangeText={(value) => {
              // Solo dígitos enteros, sin puntos ni letras
              const soloEntero = value.replace(/[^0-9]/g, '');
              setStock(soloEntero);
              resetFeedback();
            }}
            keyboardType="numeric"
          />

          {stock.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                stockValido ? styles.validText : styles.invalidText,
              ]}
            >
              {stockValido
                ? '✓ Stock válido'
                : '○ Debe ser un número entero igual o mayor a 0'}
            </Text>
          )}


          {/* ERROR --------------------------------------------------- */}

          {error !== '' && (
            <View style={styles.errorBox}>

              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>
                  No se pudo guardar
                </Text>
                <Text style={styles.errorMessage}>
                  {error}
                </Text>
              </View>

            </View>
          )}


          {/* ÉXITO --------------------------------------------------- */}

          {registrado && (
            <View style={styles.successBox}>

              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>✓</Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>
                  ¡Producto registrado!
                </Text>
                <Text style={styles.successMessage}>
                  El producto fue guardado correctamente.
                </Text>
              </View>

            </View>
          )}


          {/* BOTÓN --------------------------------------------------- */}

          <AppButton
            title="Registrar producto"
            onPress={handleGuardar}
          />

        </View>


        {/* SECCIÓN DE VALIDACIONES ----------------------------------- */}

        <View style={styles.validationSection}>

          <View style={styles.validationHeader}>

            <View>
              <Text style={styles.validationTitle}>Validaciones</Text>
              <Text style={styles.validationSubtitle}>
                Reglas aplicadas al formulario
              </Text>
            </View>

            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {validacionesCumplidas}/4
              </Text>
            </View>

          </View>

          <ValidationRow
            title="Nombre obligatorio"
            description="El campo no puede estar vacío."
            valid={nombreValido}
          />

          <ValidationRow
            title="Precio mayor a 0"
            description="Debe ser un número positivo (decimales permitidos)."
            valid={precioValido}
          />

          <ValidationRow
            title="Categoría seleccionada"
            description="Debe elegirse una categoría de la lista."
            valid={categoriaValida}
          />

          <ValidationRow
            title="Stock válido"
            description="Debe ser un número entero igual o mayor a 0."
            valid={stockValido}
          />

        </View>


        {/* PIE ------------------------------------------------------ */}

        <Text style={styles.footer}>
          AP5 — Formularios y Validaciones · React Native + Expo
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}


/* ------------------------------------------------------------------ */
/*  Componente auxiliar ValidationRow                                  */
/* ------------------------------------------------------------------ */

type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({ title, description, valid }: ValidationRowProps) {
  return (
    <View style={styles.validationRow}>

      <View
        style={[
          styles.validationCircle,
          valid ? styles.validationCircleValid : styles.validationCirclePending,
        ]}
      >
        <Text
          style={[
            styles.validationIcon,
            valid ? styles.validationIconValid : styles.validationIconPending,
          ]}
        >
          {valid ? '✓' : '○'}
        </Text>
      </View>

      <View style={styles.validationInfo}>
        <Text style={styles.validationRowTitle}>{title}</Text>
        <Text style={styles.validationRowDescription}>{description}</Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          valid ? styles.statusBadgeValid : styles.statusBadgePending,
        ]}
      >
        <Text
          style={[
            styles.statusBadgeText,
            valid ? styles.statusBadgeTextValid : styles.statusBadgeTextPending,
          ]}
        >
          {valid ? 'OK' : 'Pendiente'}
        </Text>
      </View>

    </View>
  );
}


/* ------------------------------------------------------------------ */
/*  Estilos                                                             */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  scroll: {
    padding: theme.spacing.medium,
    paddingTop: 45,
    paddingBottom: 35,
  },


  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
  },

  overline: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  title: {
    fontSize: theme.fontSize.title,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 32,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
    marginBottom: theme.spacing.large,
  },


  /* FORMULARIO */

  formCard: {
    backgroundColor: colors.background,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    marginBottom: theme.spacing.medium,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: '#98A2B3',
    marginBottom: 22,
  },


  /* ESTADO INLINE DE CAMPOS */

  fieldStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 14,
  },

  validText: {
    color: colors.success,
  },

  invalidText: {
    color: '#D97706',
  },


  /* CHIPS DE CATEGORÍA */

  chipLabel: {
    fontSize: theme.fontSize.body,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: theme.spacing.small,
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing.medium,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },

  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },

  chipTextSelected: {
    color: '#FFFFFF',
  },


  /* MENSAJE DE ERROR */

  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  errorIconText: {
    color: colors.error,
    fontSize: 17,
    fontWeight: '800',
  },

  messageContainer: {
    flex: 1,
  },

  errorTitle: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  errorMessage: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 17,
  },


  /* MENSAJE DE ÉXITO */

  successBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  successIconText: {
    color: colors.success,
    fontSize: 17,
    fontWeight: '800',
  },

  successTitle: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  successMessage: {
    color: '#15803D',
    fontSize: 12,
  },


  /* SECCIÓN VALIDACIONES */

  validationSection: {
    backgroundColor: colors.background,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },

  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  validationTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 3,
  },

  validationSubtitle: {
    fontSize: 12,
    color: '#98A2B3',
  },

  counter: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },


  /* FILAS DE VALIDACIÓN */

  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },

  validationCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  validationCircleValid: {
    backgroundColor: '#DCFCE7',
  },

  validationCirclePending: {
    backgroundColor: '#F3F4F6',
  },

  validationIcon: {
    fontSize: 17,
    fontWeight: '800',
  },

  validationIconValid: {
    color: colors.success,
  },

  validationIconPending: {
    color: '#98A2B3',
  },

  validationInfo: {
    flex: 1,
  },

  validationRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 3,
  },

  validationRowDescription: {
    fontSize: 11,
    color: '#98A2B3',
    lineHeight: 16,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },

  statusBadgeValid: {
    backgroundColor: '#ECFDF3',
  },

  statusBadgePending: {
    backgroundColor: '#F2F4F7',
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },

  statusBadgeTextValid: {
    color: '#027A48',
  },

  statusBadgeTextPending: {
    color: '#667085',
  },


  /* PIE */

  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 22,
  },

});
