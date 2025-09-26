<template>
  <svg
    width="200"
    height="200"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" stroke="#FFC300" stroke-width="2">
      <ellipse cx="50" cy="50" rx="45" ry="25" transform="rotate(30 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="25" transform="rotate(-30 50 50)" />
    </g>

    <circle cx="80" cy="42" r="6" fill="#6cb6f1" />
    <circle cx="10" cy="68" r="4" fill="#8b88e3" />
  </svg>
</template>

<style lang="scss" scoped>
:deep(path) {
  color: inherit;
}

:deep(g) {
  color: inherit;
}

:deep(rect) {
  color: inherit;
}

:deep(circle) {
  color: inherit;
}
</style>
