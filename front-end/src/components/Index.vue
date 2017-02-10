<template>
  <div class="index">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a href="/" class="nav-item">
            <i class="fa fa-folder-o green-icon" aria-hidden="true"></i>
            <p class="nav-title">Online Explorer</p>
          </a>
        </div>
        <div class="nav-right">
          <input type="text" class="input nav-search" placeholder="Search" :value="search" @input="update">
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column is-10-mobile is-offset-1-mobile is-8-tablet is-offset-2-tablet index-body">
        <p v-if="search" class="title">
          Results for "{{search}}"
        </p>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="$route.path !== '/'">
              <td>
                <a href="#" v-on:click="$router.back()">
                  <i class="fa fa-arrow-left green-icon" aria-hidden="true">
                    ..
                  </i>
                </a>
              </td>
              <td></td>
            </tr>
            <tr v-for="file in remove_hidden_file(current_files)">
              <td>
                <a v-on:click="click_file(file)">
                  <i class="fa fa-folder green-icon" aria-hidden="true" v-if="file.children"></i>
                  <i class="fa fa-file green-icon" aria-hidden="true" v-else></i>
                  {{file.name}}
                </a>
              </td>
              <td>
                {{file.size | size}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import filesize from 'filesize'
  export default {
    data () {
      return {
        search: '',
        files: []
      }
    },
    methods: {
      // eslint-disable-next-line
      update: _.debounce(function (e) {
        this.search = e.target.value
      }, 300),
      get_files (pathList, files) {
        if (pathList.length === 0 || !pathList[0]) {
          return files
        }
        for (const file of files) {
          if (file.name === pathList[0]) {
            return this.get_files(pathList.slice(1), file.children)
          }
        }
        return []
      },
      click_file (file) {
        if (file.children) {
          this.$router.push(file.path)
        } else {
          // eslint-disable-next-line
          window.open('/api/files/' + file.path)
        }
      },
      search_file (files) {
        let result = []
        for (const file of files) {
          if (file.name.toLowerCase().indexOf(this.search.toLowerCase()) > 0 && !file.children) {
            result.push(file)
          }
          if (file.children) {
            result = result.concat(this.search_file(file.children))
          }
        }
        return result
      },
      remove_hidden_file (files) {
        const result = []
        for (const file of files) {
          if (file.name.substring(0, 1) !== '.') {
            result.push(file)
          }
        }
        return result
      }
    },
    created () {
      this.$http.get('scan')
      .then(response => response.json())
      .then((json) => {
        this.files = json
      })
    },
    computed: {
      current_files () {
        if (this.search) {
          return this.search_file(this.files)
        } else {
          const pathList = this.$route.path.split('/').slice(1)
          return this.get_files(pathList, this.files)
        }
      }
    },
    filters: {
      size (value) {
        return filesize(value)
      }
    }
  }
</script>

<style>
.green-icon {
  color: #00d1b2;
}
.nav-title {
  margin-left: 8px;
}
.nav-right {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}
.nav-search {
  align-self: center;
  max-width: 300px;
}
.index-body {
  padding-top: 16px;
}
a > .green-icon {
  vertical-align: middle;
}
</style>
