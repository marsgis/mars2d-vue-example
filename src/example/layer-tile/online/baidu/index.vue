<script setup lang="ts">
import { onMounted } from "vue"
import * as mapWork from "./map.js"
import { useWidget } from "@/widgets/common/store/widget"

const { activate } = useWidget()

onMounted(() => {
  activate("query-poi")
})
</script>
