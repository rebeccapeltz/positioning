<template>
  <div id="app">
    <h1>Positioning with Gravity</h1>
    <div v-show="url" id="transform">
      <img :src="url" alt="positioning example" />
    </div>

    <b-form @submit="updateImage" inline>
      <label class="sr-only" for="gravity">Gravity:</label>

      <b-form-select
        id="gravity"
        v-model="gravity"
        :options="compass"
        class="mb-2 mr-sm-2 mb-sm-0"
        required
      ></b-form-select>
      <label for="xpos">x:</label>
      <b-form-input
        type="number"
        min="-150"
        max="150"
        step="10"
        id="xpos"
        v-model="xpos"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="X position"
      ></b-form-input>

      <label class="mr-sm-2" for="ypos">y:</label>
      <b-form-input
        type="number"
        min="-150"
        max="150"
        step="10"
        id="ypos"
        v-model="ypos"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Y position"
      ></b-form-input>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <div v-show="url" class="url-display" target="blank">
      <a :href="url">{{ url }}</a>
    </div>
  </div>
</template>

<script>
import cloudinary from "cloudinary-core";

export default {
  name: "App",
  created: function () {
    this.cld = cloudinary.Cloudinary.new({ cloud_name: "sep-2020-test" });
    this.url = this.createUrl();
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    createUrl() {
      const tr = cloudinary.Transformation.new();
      tr.width(250)
        .crop("scale")
        .effect("replace_color:red")
        .border("5px_solid_red")
        .chain()
        .overlay("logo")
        .width("50")
        .crop("fit")
        .gravity(this.gravity)
        .x(this.xpos)
        .y(this.ypos);
      console.log(this.cld.url(this.publicId, tr));
      return this.cld.url(this.publicId, tr);
    },
    updateImage(evt) {
      console.log("hi");
      // debugger
      evt.preventDefault();
      this.url = this.createUrl();
      console.log(this.url);

      console.log(`image update:  ${this.gravity} `);
      console.log(`image update:  ${this.xpos} `);
      console.log(`image update:  ${this.ypos} `);
    },
  },
  data: function () {
    return {
      publicId: "1px",
      url: null,
      gravity: "center",
      cld: undefined,
      xpos: 0,
      ypos: 0,
      compass: [
        "center",
        "north",
        "north_east",
        "east",
        "south_east",
        "south",
        "south_west",
        "west",
        "north_west",
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 4rem;
}

label,
button {
  margin: 0 0.5rem;
}
#tranform {
  width: 300;
}
.url-display {
  padding: 1rem;
  margin: 0.5rem auto;
  text-align: "center";
  background: #f0f0f0;
  width: 320px;
  word-wrap: break-word;
}
.url-display a {
  color: #2c3e50;
}
</style>
