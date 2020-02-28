Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    info: Object
  },
  methods: {
    itemClick ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      console.log(id)
    },
    cartClick ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      console.log(id)
    }
  },
})