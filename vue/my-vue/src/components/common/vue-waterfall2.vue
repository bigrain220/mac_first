<template>
<!-- vue-waterfall-easy更好用 -->
  <div class="container-water-fall">
    <!-- <h1 style="position: fixed;left: 0;top: 100px;font-style: 15px;color:blue;z-index: 1000;">{{loadstatus}}</h1> -->
    <div class="btn-group"> <button @click="loadmore">LoadMore</button></div>

    <waterfall :col='col' :data="data" @loadmore="loadmore" @scroll="scroll" @finish="finish">
      <template>
        <div class="cell-item" v-for="(item,index) in data" :key="index">
          <img v-if="item.img" :src="item.img" alt="加载错误" />
          <div class="item-body">
            <div class="item-desc">{{item.title}}</div>
            <div class="item-footer">
              <div v-if="item.avatar" class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div>
              <div class="name">{{item.user}}</div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
    <!-- <loading :show="loading" /> -->
  </div>
</template>

<script>
/*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
export default {
  data() {
    return {
      data: [
        {
          img:
            "https://img13.360buyimg.com/mobilecms/s140x140_jfs/t1/82337/35/12286/110292/5d9c2403Ea23a00ce/c3722cdd731bf964.jpg.webp",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "1",
          user: "www",
          like: "953"
        },
        {
          img:
            "https://img14.360buyimg.com/pop/s590x470_jfs/t1/79097/37/11077/39353/5d8ad63dEf4db3726/a078845a0cbf09c1.jpg.webp",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "2",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://img10.360buyimg.com/img/jfs/t1/56840/19/12953/216991/5d9bfc90Ea8897588/8f0aa267554fb972.png.webp",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "3",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/eb4fb58f.jpg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "4",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/71d19462.jpg?x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "5",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/415f984f.jpeg?w=828&h=1104&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "6",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
         {
          img:
            "https://img13.360buyimg.com/mobilecms/s140x140_jfs/t1/82337/35/12286/110292/5d9c2403Ea23a00ce/c3722cdd731bf964.jpg.webp",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "1",
          user: "www",
          like: "953"
        },
        {
          img:
            "https://img14.360buyimg.com/pop/s590x470_jfs/t1/79097/37/11077/39353/5d8ad63dEf4db3726/a078845a0cbf09c1.jpg.webp",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "2",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://img10.360buyimg.com/img/jfs/t1/56840/19/12953/216991/5d9bfc90Ea8897588/8f0aa267554fb972.png.webp",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "3",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
      ],
      col: 5
    };
  },
  computed: {
    itemWidth() {
      return 133 * 0.5 * (document.documentElement.clientWidth / 375);
    },
    gutterWidth() {
      return 10 * 0.5 * (document.documentElement.clientWidth / 375);
    }
  },
  methods: {
    scroll(scrollData) {
      // console.log(scrollData)
    },
    finish() {
      console.log("finish");
    },
    loadmore() {
      console.log(9999);
      this.loading = true;
      setTimeout(() => {
        this.data = this.data.concat(this.data, this.data);
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.container-water-fall {
  width: 100vw;
  box-sizing: border-box;
  button {
    background-color: #ff0;
    color: #24292e;
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 0.25em;
    width: 100px;
    line-height: 26px;
    font-size: 13px;
    margin: 4px 0;
    margin-right: 4px;
    cursor: pointer;
    outline: none;
  }

  .cell-item {
    width: 100%;
    margin-bottom: 10px;
    background: #ffffff;
    border: 2px solid #f0f0f0;
    border-radius: 12px 12px 12px 12px;
    overflow: hidden;
    box-sizing: border-box;
    img {
      // border-radius: 12px 12px 0 0;
      width: 100%;
      height: auto;
      display: block;
    }
    .item-body {
      // border: 1px solid #F0F0F0;
      padding: 12px;
      .item-desc {
        font-size: 15px;
        color: #333333;
        line-height: 15px;
        font-weight: bold;
      }
      .item-footer {
        margin-top: 22px;
        position: relative;
        display: flex;
        align-items: center;
        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 14px;
          color: #999999;
        }
      }
    }
  }
}
</style>>
