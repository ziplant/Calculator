exports.variable = {
  elem: 'div',
  attributes: {
    class: 'vars_item'
  },
  children: {
    key: {
      elem: 'input',
      attributes: {
        class: 'vars_key'
      },
      events: {
        input: 'inputVar'
      }
    },
    eq: {
      elem: 'div',
      attributes: {
        class: 'vars_eq'
      },
      text: '='
    },
    value: {
      elem: 'input',
      attributes: {
        class: 'vars_value'
      },
      events: {
        input: 'inputVar'
      }
    },
    remove: {
      elem: 'button',
      attributes: {
        class: 'vars_remove'
      },
      text: 'Remove',
      events: {
        click: 'removeVar'
      }
    }
  }
}