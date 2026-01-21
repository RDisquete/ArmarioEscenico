# 🎭 Armario Escénico - Catálogo Digital de Vestuario Histórico

[![Netlify Status](https://api.netlify.com/api/v1/badges/tu-id-de-netlify/deploy-status)](https://armarioescenico.netlify.app/)

Desarrollo de una plataforma digital para la **Asociación Sambrona** (dentro del flujo de trabajo de **ADV Estudio**). Este proyecto digitaliza un archivo de cientos de prendas teatrales, permitiendo a figurinistas y productores localizar vestuario específico de forma ágil y precisa.

## 🚀 El Reto
Transformar un inventario físico complejo y heterogéneo en una herramienta digital intuitiva. El objetivo principal era facilitar el alquiler de vestuario para financiar las producciones culturales de la asociación, eliminando las barreras de búsqueda manual.

## 🛠 Stack Tecnológico
* **Frontend:** React + TypeScript (Garantizando un desarrollo basado en tipos y mantenible).
* **Estilos:** Tailwind CSS (Arquitectura de diseño *responsive* y *mobile-first*).
* **Estado y Persistencia:** Lógica personalizada con Hooks y **LocalStorage** para la gestión de la cesta de pedido sin necesidad de registro previo.
* **Despliegue:** Netlify.

## 🧠 Características Técnicas Destacadas

### 1. Sistema de Filtrado Multi-Criterio
Implementación de una lógica de filtrado avanzada que permite combinar múltiples categorías simultáneamente:
* **Época Histórica** (Desde la antigüedad hasta el siglo XX).
* **Género y Clase Social** (Nobleza, campesinado, clero, etc.).
* **Materiales y Tipología de prenda**.
* *Optimización:* Uso de `useMemo` para evitar re-calculos costosos durante el renderizado de la lista.

### 2. Persistencia de Datos (Zero-Friction UX)
Se ha priorizado la experiencia del usuario final (*figurinista*) implementando persistencia en `localStorage`. Esto permite que la selección de prendas (la "cesta") se mantenga intacta tras cierres accidentales del navegador o recargas de página, mejorando drásticamente la usabilidad del servicio.

### 3. Arquitectura de Componentes Reutilizables
Desarrollo de una interfaz modular donde cada tarjeta de producto y selector de filtro es un componente independiente, facilitando la escalabilidad del catálogo en el futuro.

## 📈 Evolución y Feedback
Este proyecto no es estático; ha pasado por varias iteraciones tras el feedback directo de los usuarios. Se refinó la navegación para reducir el número de clics necesarios para llegar a un artículo específico, priorizando la claridad visual de las imágenes (crucial en el sector del vestuario).

---
**Desarrollado por Rafael Dorado (RDisquete)** [Portfolio](https://rdisquete.es) | [LinkedIn](https://www.linkedin.com/in/tu-perfil/)

*"Usando el código para que la cultura circule mejor."*