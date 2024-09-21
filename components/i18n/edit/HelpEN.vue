<script setup lang="ts"></script>

<template>
  <div>
    <p>
      Our current definition of Visualnovel is based on games that can be found
      on VNDB. If a game cannot be found on VNDB, it is not considered a
      Visualnovel.
    </p>
    <p>
      For non-Visualnovel games that cannot be found in the search, please
      temporarily classify them under topic's Galgame -> Others category.
    </p>
    <p>
      <a
        href="https://kungal.com/topic/1041"
        target="_blank"
        rel="noopener noreferrer"
      >
        How to search for Galgame through VNDB?
      </a>
    </p>
    <p>
      Before publishing a new visualnovel, please make sure there is no existing
      visualnovel with the same title in the forum. You will earn 3 MoeMoePoints
      for publishing a new visualnovel.
    </p>
    <p>
      If you want to publish visualnovel resources, and the game does not exist,
      you need to create the game first.
    </p>
    <p>
      <strong>
        If the game already exists, you can add resource links on the
        corresponding game page.
      </strong>
    </p>
    <p>
      The fetch VN data API is sourced from VNDB, and it has rate limits. Please
      use it reasonably. If you cannot retrieve the data, please fill it in
      manually.
    </p>
    <p class="note">
      Note that creating a VN resource means you will need to add a link to
      access/download this VN resource on the VN resource details page later.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.help {
  a {
    color: var(--kungalgame-blue-5);

    .icon {
      margin-left: 10px;
    }
  }
}

.site {
  display: flex;
  flex-wrap: wrap;
  margin: 17px 0;

  a {
    font-weight: bold;
    color: var(--kungalgame-blue-5);
    padding: 3px 7px;
    border-bottom: 2px solid transparent;
    margin-right: 10px;

    &:first-child {
      color: var(--kungalgame-red-5);
    }

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

.definition {
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;

  a {
    color: var(--kungalgame-blue-5);
    font-style: oblique;
  }

  p {
    margin-top: 10px;
  }
}

.note {
  color: var(--kungalgame-red-5);
}
</style>
