/* show/hide sublevel elements */
function toggleList(btn) {
  elems = btn.id;
  let arr = Array.from(document.getElementsByClassName(elems));
  if (btn.classList.contains('more')) {
    arr.forEach(item => {
      item.style.display = 'grid'
    })
    btn.classList.remove('more')
  } else {
    arr.forEach(item => {
      item.style.display = 'none'
    })
    btn.classList.add('more')
  }
}

const hoverDivs = document.getElementsByClassName('hover-effect')
if (hoverDivs){
  const Arr = Array.from(hoverDivs)
  Arr.forEach(item => {
    item.addEventListener('mouseenter', (event) => {
      console.log('mouseenter')
      const parent = item.parentElement
      const parentChildren = Array.from(parent.children);
      index = parentChildren.indexOf(item)
      console.log(index)

      const allRows = Array.from(document.getElementsByClassName('table-grid-row'))

      allRows.forEach(item => {
        item.children[index].classList.add('hover-column')
      })
    })
    item.addEventListener('mouseleave', (event) => {
      console.log('mouseleave')
      const parent = item.parentElement
      const parentChildren = Array.from(parent.children);
      index = parentChildren.indexOf(item)
      console.log(index)

      const allRows = Array.from(document.getElementsByClassName('table-grid-row'))

      allRows.forEach(item => {
        item.children[index].classList.remove('hover-column')
      })
    })
  })
}


/* fixed menu */
// const stickyBlocks = document.getElementsByClassName('sticky-block')
// if (stickyBlocks){
//   const arrStickyBlocks = Array.from(stickyBlocks)
//     arrStickyBlocks.forEach(item => {
//       let box = item.getBoundingClientRect()
//       let offsetElem = box.top + window.pageYOffset
//       console.log('offsetElem'+offsetElem)
//       window.addEventListener('scroll', function() {
//         let scrollTop = window.scrollY 
//         console.log('scrollTop'+scrollTop)
//         if (scrollTop > offsetElem) {
//           item.classList.add("sticky")
//         } else {
//           item.classList.remove("sticky")
//         }
//       });
//     })
  
// }


const mobileMenu = document.getElementById('offcanvasMenu')
const bsMenu = new bootstrap.Offcanvas(mobileMenu)
function openMenu(btn) {
  bsMenu.toggle()
  mobileMenu.addEventListener('shown.bs.offcanvas', function () {
    btn.classList.add('close')
  })
  mobileMenu.addEventListener('hidden.bs.offcanvas', function () {
    btn.classList.remove('close')
  })
}


/*************** 
CUSTOM SELECT
****************/
window.onload = function() {
  let selectElement = document.querySelectorAll('.custom-select')
  if(selectElement) {
    let arrSelects = Array.from(selectElement)
    arrSelects.forEach(item => {
        const btn = item.querySelector('button')
        const options = item.querySelector('.custom-select-options')
        let inputs = item.querySelectorAll('input')
        let name = inputs[0].name

        let curInp; //выбранный input radio
        for(let i = 0; i < inputs.length; i++){
          if(inputs[i].checked){
            curInp = inputs[i]
          }
        }

        if(curInp) {
          let labelContent = curInp.nextElementSibling.innerHTML //содержимое label следующего после выбранного input
          btn.innerHTML = labelContent
        } else {
          btn.innerHTML = "Не выбрано"
        }

        const toggleMenu = function() {
          // открываем/закрываем окно навигации, добаляя/удаляя активный класс
          options.classList.toggle('opened')
        }

        btn.addEventListener('click', () => { // при клике на кнопку
          toggleMenu()
        })
        
        //скрываем опции при клике вне селекта
        document.addEventListener('click', function(e) {
          const currentSel = target == item || item.contains(e.target)
          const isOpened = options.classList.contains('opened')
          if (!currentSel && isOpened) {
            toggleMenu()
          }
        })

        let arrRadio = Array.from(inputs)
        arrRadio.forEach(item => {
          item.addEventListener('change', () => {
            changeValueLabel(item)
          })
        })
    
        function changeValueLabel(el){
          let labelContent = el.nextElementSibling.innerHTML;
          btn.innerHTML = labelContent;
          toggleMenu();
        }
    })
  }
}