
/** 
 * Anime un titre avec un effet d'apparition mot par mot
 * 
 * @param {string} selector
*/

function animateTitle(selector) {
    const title = document.querySelector(selector)
    if (title == null) {
        console.error('Impossible de trouver l\'élément '+ selector)
        return
    }

    // On construit un tableau contenant la nouvelle structure
    const children = Array.from(title.childNodes)
    let elements = []
    children.forEach(child => {
        if (child.nodeType == Node.TEXT_NODE) {
            const words = child.textContent.split(' ')
            let spans = words.map(wrapWord)
            elements = elements.concat(
                injectElementBetweenItems(spans, document.createTextNode(' '))
            )
        } else {
            elements.push(child)
        }
    })
    console.log(elements)

    // On utilise le tableau créé pour injecter les élément dans title
    title.innerHTML = ''
    elements.forEach(el => {
        title.appendChild(el)
    })

    // On met en place un délai entre chaque mot
    Array.from(title.querySelectorAll('span span')).forEach((span, k) => {
        span.style.animationDelay = (k * .1) + 's'
    })

}

/**
 * Entoure le mot de 2 span
 * 
 * @param {string} word
 */

function wrapWord(word) {
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    span.appendChild(span2)
    span2.innerHTML = word
    return span
}

/**
 * 
 * @param {Node[]} arr
 * @param {Node} element Elément à injecter entre chaque élément du tableau
 * @returns {Node[]}
 * 
 */
function injectElementBetweenItems(arr, element) {
    return arr.map((item, k) => {
        if (k == arr.length -1) {
            return[item]
        }
        return [item, element.cloneNode()]
    }).reduce((acc,pair) => {
        acc = acc.concat(pair)
        return acc
    }, [])
}

animateTitle('.title')