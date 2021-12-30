const scroller = document.querySelector('main > section:first-child')
const svgContainer = document.querySelector('main > section:last-child')

/**
 * @param {Array<IntersectionObserverEntry>} entries
 * @param {IntersectionObserver} observer
 */
const observerCB = (entries, observer) => {
    entries.forEach(entry => {
        console.log(entry.target);
        console.log(entry.isIntersecting);
    })
    console.log('yay');
}

let currentView = null

/**@type {IntersectionObserver} */
const observer = new IntersectionObserver(items => {
    items.forEach(
        item => {
            if (item.isIntersecting) {
                /**@type {HTMLElement} */ // @ts-ignore
                const target = item.target
                item.target.classList.add('in-view')
                const { svgTarget } = target.dataset

                svgContainer.querySelector(`svg:nth-child(${svgTarget})`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            } else {
                item.target.classList.remove('in-view')
            }
        })
}, {
    root: scroller,
    threshold: 0
})


const articles = scroller.querySelectorAll('article')


articles.forEach(article => observer.observe(article))