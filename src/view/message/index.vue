<template>
  <Card shadow>
    <div>
      <div class="message-page-con message-category-con">
        <Menu width="auto" active-name="unread" @on-select="handleSelect">
          <MenuItem name="unread">
            <span class="category-title">未读消息</span><Badge style="margin-left: 10px" :count="unreadMsgCount"></Badge>
          </MenuItem>
          <MenuItem name="read">
            <span class="category-title">已读消息</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="readMsgCount"></Badge>
          </MenuItem>
          <MenuItem name="remove">
            <span class="category-title">回收站</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="removeMsgCount"></Badge>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-list-con">
        <Spin fix v-if="listLoading" size="large"></Spin>
        <Menu
          width="auto"
          active-name=""
          :class="titleClass"
          @on-select="handleView"
        >
          <MenuItem v-for="item in list" :name="item.id" :key="item.id">
            <div>
              <p class="msg-title">{{ item.title }}</p>
              <Badge status="default" :text="item.createTime" />
              <Button
                style="float: right;margin-right: 20px;"
                :style="{ display: item.loading ? 'inline-block !important' : '' }"
                :loading="item.loading"
                size="small"
                :icon="currentType === 'read' ? 'md-trash' : 'md-redo'"
                :title="currentType === 'read' ? '删除' : '还原'"
                type="text"
                v-show="currentType !== 'unread'"
                @click.native.stop="handleOperate(item)"></Button>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-view-con">
        <Spin fix v-if="contentLoading" size="large"></Spin>
        <div class="message-view-header">
          <h2 class="message-view-title">{{ currentItem.title }}</h2>
          <time class="message-view-time">{{ currentItem.createTime }}</time>
        </div>
        <div v-html="content"></div>
      </div>
    </div>
  </Card>
</template>

<script>
import { forEach } from '@/libs/tools'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const listDic = {
  read: 'readList',
  unread: 'unreadList',
  remove: 'removeList'
}
export default {
  name: 'msg_center',
  data () {
    return {
      listLoading: true,
      contentLoading: false,
      currentType: 'unread',
      currentItem: {},
      content: ''
    }
  },
  computed: {
    ...mapState({
      readList: state => state.msg.readMsgList,
      unreadList: state => state.msg.unreadMsgList,
      removeList: state => state.msg.removeMsgList,
      list () {
        return this[listDic[this.currentType]]
      },
      titleClass () {
        return {
          'not-unread-list': this.currentType !== 'unread'
        }
      }
    }),
    ...mapGetters([
      'readMsgCount',
      'unreadMsgCount',
      'removeMsgCount'
    ])
  },
  methods: {
    ...mapMutations([
      //
    ]),
    ...mapActions([
      'getMsgContent',
      'getMsgList',
      'hasReadMsg',
      'removeReadMsg',
      'restoreRemoveMsg'
    ]),
    stopLoading (name) {
      this[name] = false
    },
    handleSelect (name) {
      this.currentType = name
    },
    handleView (id) {
      this.contentLoading = true
      this.getMsgContent(id).then(content => {
        this.content = content
        const item = this.list.find(item => item.id === id)
        if (item) this.currentItem = item
        if (this.currentType === 'unread') this.hasReadMsg(id)
        this.stopLoading('contentLoading')
      }).catch(() => {
        this.stopLoading('contentLoading')
      })
    },
    handleOperate (item) {
      item.loading = true
      const id = item.id
      if (this.currentType === 'read') this.removeReadMsg(id)
      else this.restoreRemoveMsg(id)
    }
  },
  mounted () {
    this.listLoading = true
    // 请求获取消息列表
    this.getMsgList().then(() => this.stopLoading('listLoading')).catch(() => this.stopLoading('listLoading'))
  }
}
</script>

<style lang="less">
.message-page{
  &-con{
    height: ~"calc(100vh - 176px)";
    display: inline-block;
    vertical-align: top;
    position: relative;
    &.message-category-con{
      border-right: 1px solid #e6e6e6;
      width: 200px;
    }
    &.message-list-con{
      border-right: 1px solid #e6e6e6;
      width: 230px;
    }
    &.message-view-con{
      position: absolute;
      left: 446px;
      top: 16px;
      right: 16px;
      bottom: 16px;
      overflow: auto;
      padding: 12px 20px 0;
      .message-view-header{
        margin-bottom: 20px;
        .message-view-title{
          display: inline-block;
        }
        .message-view-time{
          margin-left: 20px;
        }
      }
    }
    .category-title{
      display: inline-block;
      width: 65px;
    }
    .gray-dadge{
      background: gainsboro;
    }
    .not-unread-list{
      .msg-title{
        color: rgb(170, 169, 169);
      }
      .ivu-menu-item{
        .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
          display: none;
        }
        &:hover{
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
