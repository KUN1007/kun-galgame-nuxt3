<script setup lang="ts"></script>

<template>
  <svg
    class="kungalgame-waves"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shape-rendering="auto"
  >
    <defs>
      <path
        id="kun-footer-gentle-wave"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g class="kun-footer-parallax">
      <use xlink:href="#kun-footer-gentle-wave" x="48" y="0" />
      <use xlink:href="#kun-footer-gentle-wave" x="48" y="3" />
      <use xlink:href="#kun-footer-gentle-wave" x="48" y="5" />
      <use xlink:href="#kun-footer-gentle-wave" x="48" y="7" />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.kungalgame-waves {
  position: relative;
  width: 100%;
  min-height: 50px;
  max-height: 50px;
}

.kun-footer-parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  fill: var(--kungalgame-trans-blue-2);

  &:nth-child(1) {
    opacity: 0.5;
    animation-delay: -2s;
    animation-duration: 7s;
  }

  &:nth-child(2) {
    opacity: 0.3;
    animation-delay: -3s;
    animation-duration: 10s;
  }

  &:nth-child(3) {
    opacity: 0.2;
    animation-delay: -4s;
    animation-duration: 13s;
  }

  &:nth-child(4) {
    opacity: 0.1;
    animation-delay: -5s;
    animation-duration: 20s;
  }
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
