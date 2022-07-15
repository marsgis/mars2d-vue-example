<template>
  <mars-dialog width="300" left="10" top="10">
    <p class="mars-load-head">One Belt One Road 图例</p>
    <ul class="mars-load-introduce">
      <li>
        <span class="mars-load-introduce-belt">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <div class="mars-load-info">
          <p>丝绸之路经济带</p>
          <p>Silk Road Economic Belt</p>
        </div>
      </li>
      <li>
        <span class="mars-load-introduce-road">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <div class="mars-load-info">
          <p>21世纪海上丝绸之路</p>
          <p>21st century Maritime Silk Road</p>
        </div>
      </li>
    </ul>
  </mars-dialog>
</template>

<script setup lang="ts">
</script>
<style lang="less" scoped>
.mars-load-head {
  font-size: 16px;
  color: #ffffff;
  line-height: 30px;
  text-align: center;
}

.mars-load-introduce li {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 14px;
  margin-top: 10px;
}

.mars-load-introduce li span {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
}

.mars-load-introduce li span i {
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

.mars-load-introduce .mars-load-info {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #ffffff;
}

.mars-load-introduce .mars-load-info p {
  margin-bottom: 5px;
}

.mars-load-introduce-belt i {
  background: #ff7f50;
}

.mars-load-introduce-road i {
  background: #00bfff;
}

.mars3d-popup-background {
  background: rgba(1, 34, 65, 0.5);
  border: 1px solid #13b1f8;
  border-radius: 5px;
}

.mars-load-location {
  font-size: 14px;
}

.mars-load-location i {
  font-style: normal;
}
</style>
