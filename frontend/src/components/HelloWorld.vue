<template>
  <div class="home">
    <div>SORT ITEMS</div>
    <ul id="items" class="removeUlStype">
      <li
        v-for="element in data"
        :index="element.element_id"
        :key="element.position"
      >
        {{ element.element_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import API from "@/services/api.js";
import Sortable from "sortablejs";

export default {
  name: "Home",
  components: {},

  data() {
    return { data: {}, oldPosition: null, newPosition: null };
  },
  async created() {
    const data = await API.get("/elements");
    this.data = data.data;

    var el = document.getElementById("items");
    Sortable.create(el, {
      // Element dragging ended
      onEnd: async function (/**Event*/ evt) {
        let oldPosition = evt.oldDraggableIndex + 1;
        let newPosition = evt.newDraggableIndex + 1;
        const sendData = {
          oldPosition,
          newPosition,
        };
        const data = await API.put("/elements/move", sendData);
        if (data.response === "success") this.data = data;
      },
    });
  },
};
</script>
<style scoped>
.removeUlStype {
  list-style-type: none;
}
</style>