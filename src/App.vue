<template>
  <div id="app">
    <h1>Positioning with Gravity</h1>
    <!-- <cld-image cloudName="sep-2020-test" publicId="1px" width="300">
      <cld-transformation effect="replace_color:red" width="300" crop="scale"/>
      <cld-transformation
        overlay="logo"
        width="50"
        crop="fit"
        :gravity="gravity"
        :x="xpos"
        :y="ypos"
      />
    </cld-image>-->
    <!-- <MyImage :gravity="gravity" :xpos="xpos" :ypos="ypos"/> -->
    <div id="transform">
      <img :src="url" alt="positioning" />
    </div>
    <!-- <div>{{ gravity }} {{ xpos }} {{ ypos }}</div> -->

    <b-form @submit="updateImage" inline>
      <!-- <b-form-group id="group-select" label="Gravity:" label-for="gravity" > -->
      <label class="sr-only" for="gravity">Gravity:</label>

      <b-form-select
        id="gravity"
        v-model="gravity"
        :options="compass"
        class="mb-2 mr-sm-2 mb-sm-0"
        required
      ></b-form-select>
      <!-- </b-form-group> -->
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
      <!-- <b-form-spinbutton inline id="xpos" v-model="xpos" min="1" max="300"></b-form-spinbutton> -->

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
      <!-- <b-form-spinbutton inline id="ypos" v-model="ypos" min="1" max="300"></b-form-spinbutton> -->
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import MyImage from "@/components/MyImage";
import cloudinary from "cloudinary-core";

export default {
  name: "App",
  // components: {
  //   // Cloudinary,
  //   // CldImage,
  //   // MyImage
  // },
  created: function () {
    this.cld = cloudinary.Cloudinary.new({ cloud_name: "sep-2020-test" });
    const tr = cloudinary.Transformation.new();
    tr.width(300)
      .crop("scale")
      .effect("replace_color:red")
      .chain()
      .overlay("logo")
      .width("50")
      .crop("fit")
      .gravity(this.gravity)
      .x(this.xpos)
      .y(this.ypos);
    this.url = this.cld.url("1px", tr);
    // this.url =
    //   "https://res.cloudinary.com/sep-2020-test/image/upload/c_scale,w_300,e_replace_color:red/1px";
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    createUrl() {
      const tr = cloudinary.Transformation.new();
      tr.width(200)
        .crop("scale")
        .effect("replace_color:red")
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
      // this.url =
      //   "https://res.cloudinary.com/sep-2020-test/image/upload/c_scale,w_300,e_replace_color:green/1px";
      // const tr = cloudinary.Transformation.new();
      // tr.width(300)
      //   .crop("scale")
      //   .effect("replace_color:red")
      //   .chain()
      //   .overlay("logo")
      //   .width("50")
      //   .crop("fit")
      //   .gravity("center")
      //   .x(100)
      //   .y(100);
      // this.url = this.cld.url("1px", tr);

      // .chain().angle(15)
      //  this.url = this.cld.url("1px", {
      // secure: true,
      // cld.transformation()
      // .transformation('effect',"replace_color:red", width: "300", crop: "scale" ),
      //   // {
      //   overlay: new cloudinary.Layer().publicId("logo"),
      //   width: "50",
      //   crop: "fit",
      //   gravity: "center",
      //   x: 100,
      //   y: 100
      // }

      // });
      //  studentData.URL = cld.url(
      //     studentData.publicId,
      //     cld
      //       .transformation()
      //       .variables([
      //         ['$data', `${overlayText}`],
      //         ['$color', `${studentData.color}`],
      //         ['$bgcolor', `${studentData.bgcolor}`]
      //       ])
      //       .transformation('v-badge-color')
      // )
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

label, button {
  margin: 0 .5rem;
}
#tranform {
  width: 300
}
</style>
