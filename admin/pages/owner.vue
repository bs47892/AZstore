<template>
    <main>
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-spacing-top-medium"></div>
            <h2>Add a new owner</h2>
            <form>
              <!-- Name -->
              <div class="a-spacing-top-medium">
                <label>Name</label>
                <input class="a-input-text" style="width: 100%" v-model="name" />
              </div>
  
              <!-- About -->
              <div class="a-spacing-top-medium">
                <label>About</label>
                <input class="a-input-text" style="width: 100%" v-model="about" />
              </div>
  
              <!-- Photo file -->
              <div class="a-spacing-top-medium">
                <label >Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" name="photo" @change="onFileSelected" />
                    <p style="margin-top: -70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>
  
              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddOwner">Add Owner</span>
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul class="list-group" v-if="owners">
  <li v-for="owner in owners" :key="owner._id" class="list-group-item">
    {{ owner.name }}
  </li>
</ul>


          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </main>
  </template>
      
  <script>
   import { $axios } from '@nuxtjs/axios';
  export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/owners");
      return {
        owners: response.owners
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
  return {
    name: "",
    about: "",
    selectedFile: null,
    fileName: "",
    owners: [], // Initialize with an empty array
  };
},

  methods: {
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
        this.fileName = event.target.files[0].name;
      },
      async onAddOwner() {
  const reader = new FileReader();
  const onLoadPromise = new Promise((resolve) => {
    reader.onload = () => resolve();
  });
  reader.readAsArrayBuffer(this.selectedFile);
  await onLoadPromise;

  const data = new FormData();
  data.append("name", this.name);
  data.append("about", this.about);
  data.append("photo", this.selectedFile);

  try {
    let response = await this.$axios.$post(
      "http://localhost:3000/api/owners",
      data
    );
    this.owners.push(response.owner);
    console.log(this.owners);
  } catch (err) {
    console.log(err);
  }
}
  }
};
  /*
  export default {
    async asyncData({ $axios }) {
      try {
        let response = await $axios.$get("http://localhost:3000/api/owners");
        return {
          owners: response.owners
        };
      } catch (err) {
        console.log(err);
      }
    },
    data() {
      return {
        name: "",
        about: "",
        selectedFile: null,
        fileName: ""
      };
    },
    methods: {
      onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        this.fileName = event.target.files[0].name;
      },
      async onAddOwner() {
        try {
          let data = new FormData();
          data.append("name", this.name);
          data.append("about", this.about);
          data.append("photo", this.selectedFile, this.selectedFile.name);
          let response = await this.$axios.$post(
            "http://localhost:3000/api/owners",
            data
          );
          this.owners.push(this.name);
          console.log(this.owners);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  */
  </script>