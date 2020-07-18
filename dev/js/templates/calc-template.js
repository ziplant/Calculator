exports.calc = {
  elem: 'div',
  attributes: {
    class: 'calc'
  },
  children: {
    head: {
      elem: 'div',
      attributes: {
        class: 'calc_head'
      },
      children: {
        title: {
          elem: 'h4',
          attributes: {
            class: 'calc_title'
          },
          text: 'Calculator'
        }
      }
    },
    input: {
      elem: 'input',
      attributes: {
        type: 'text',
        class: 'calc_input'
      },
      events: {
        input: 'counting'
      }
    },
    controls: {
      elem: 'div',
      attributes: {
        class: 'calc_controls'
      },
      children: {
        clear: {
          elem: 'button',
          attributes: {
            class: 'calc_btn calc_btn--clear'
          },
          text: 'Clear',
          events: {
            click: 'clear'
          }
        },
        add: {
          elem: 'button',
          attributes: {
            class: 'calc_btn calc_btn--add'
          },
          text: 'Add variable',
          events: {
            click: 'addVar'
          }
        }
      }
    },
    result: {
      elem: 'p',
      attributes: {
        class: 'calc_result'
      }
    },
    vars: {
      elem: 'div',
      attributes: {
        class: 'calc_vars vars'
      }
    }
  }
}