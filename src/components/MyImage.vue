<template>
  <div class="myimage">
    <cld-image cloudName="sep-2020-test" publicId="1px" width="300">
      <cld-transformation effect="replace_color:red" width="300" crop="scale"/>
      <cld-transformation
        overlay="logo"
        width="50"
        crop="fit"
        :gravity="gravity"
        :x="x"
        :y="y"
      />
    </cld-image>
    <div>{{xpos}} {{ypos}} {{gravity}}</div>
  </div>
</template>

<script>
import Cloudinary, { CldImage } from "cloudinary-vue";

export default {
  name: "MyImage",
  components: {
    Cloudinary,
    CldImage
  },
  data: function() {
    return {
      x: this.xpos,
      y: this.ypos,
      g: this.gravity
    };
  },
  computed: {
    cGravity: function(){
      return this.g
    }
  },
  props: {
    xpos: String,
    ypos: String,
    gravity: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
