<script setup lang="ts"></script>

<template>
  <div class="content">
    <p>
      When you register as a member of KUN Visual Novel, you become a user of
      KUN Visual Novel, and at this point, we consider that you have confirmed
      the following user agreement:
    </p>
    <p>1. All statements made by users are not related to KUN Visual Novel.</p>
    <p>
      2. KUN Visual Novel is merely an open-source collaborative web development
      project designed for everyone to learn web knowledge.
    </p>
    <p>
      3. We reserve the right to ban users who engage in actions detrimental to
      the maintenance of our open-source project.
    </p>
    <p>
      4. KUN Visual Novel is not responsible for any losses caused by issues
      such as user account theft.
    </p>
    <p>Agreement Version - V 1.0.0</p>
  </div>
</template>

<style lang="scss" scoped>
.content {
  & > p {
    margin: 5px;

    &:nth-child(2) {
      margin-top: 20px;
    }

    &:last-child {
      margin: 50px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
