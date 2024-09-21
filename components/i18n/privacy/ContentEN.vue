<script setup lang="ts"></script>

<template>
  <div class="article">
    <br />
    <p>
      We will never use your personal information and will not use your personal
      information for anything outside of this site.
    </p>
    <br />
    <p>
      Yes, only this sentence, because
      <strong>
        we are not a commercial forum, and profit is not our purpose.
      </strong>
      There is no need to profit from personal data.
    </p>
    <br />
    <p>To be precise, we need the following permissions:</p>
    <br />
    <ul class="list">
      <li>
        Personal Information: Email, registration time, etc., used for password
        recovery.
      </li>
      <li>
        Log-Related Information: Through cookies, Local Storage, and other
        means, we provide search history, image caching, and other experience
        optimizations. You can disable cookies and similar methods to prevent
        our use.
      </li>
      <li>
        Device-Related Information: Device date, operating system information,
        etc., for convenient device adaptation.
      </li>
    </ul>

    <div class="nav">
      <KunBackToPrevious />
      <KunBackToHome />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  padding: 20px;
}

.list > li {
  margin-bottom: 30px;
  list-style: inside;
}

.title {
  font-size: 30px;
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.nav {
  display: flex;
  justify-content: space-between;
}
</style>
