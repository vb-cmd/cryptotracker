const SIZE = { xs: 'bx-xs', sm: 'bx-sm', md: 'bx-md', lg: 'bx-lg' };
const TYPE = { 'regular': 'bx', 'solid': 'bxs', 'logo': 'bxl' };
const ROTATE = { '90': 'bx-rotate-90', '180': 'bx-rotate-180', '270': 'bx-rotate-270', flipHorizontal: 'bx-flip-horizontal', flipVertical: 'bx-flip-vertical' }
const BORDER = { circle: 'bx-border-circle', border: 'bx-border' }
const FIXED_WIDTH = 'bx-fw'
const PULLED_ICON = { left: 'bx-pull-left', right: 'bx-pull-right' }
const ANIMATION = { spin: 'bx-spin', tada: 'bx-tada', flashing: 'bx-flashing', brust: 'bx-burst', fadeLeft: 'bx-fade-left', fadeRight: 'bx-fade-right' }

/**
* @param {Object} params 
* @param {string} params.name 
* @param {("regular" | "solid" | "logo")} params.type 
* @param {("xs" | "sm" | "md" | "lg")} params.size 
* @param {boolean} [params.fixedWidth=false] 
* @param {("right" | "left")} params.pulledIcon 
* @param {("90" | "180" | "270" | "flipHorizontal" | "flipVertical")} params.rotate 
* @param {("circle" | "border")} params.border 
* @param {("spin" | "tada" | "flashing" | "brust" | "fadeLeft" | "fadeRight")} params.animation 
* @param {boolean} [params.animationHover=false]
*/
export default function Boxicon({ name, type, size, fixedWidth = false, pulledIcon, rotate, border, animation, animationHover = false }) {
    const checkParam = (params, key) => {
        const value = params[key]
        return value !== 'undefined' ? value : ''
    }

    const buildIcon = (name, type, size, fixedWidth = false, pulledIcon, rotate, border, animation, animationHover = false) => {
        let cn = ['bx']

        cn.push(name && type ? `${checkParam(TYPE, type)}-${name}` : '')
        cn.push(checkParam(SIZE, size))
        cn.push(fixedWidth ? `${FIXED_WIDTH}` : '')
        cn.push(checkParam(PULLED_ICON, pulledIcon))
        cn.push(checkParam(ROTATE, rotate))
        cn.push(checkParam(BORDER, border))
        cn.push(animation ? animationHover ? `${checkParam(ANIMATION, animation)}-hover` : `${checkParam(ANIMATION, animation)}` : '')

        return cn.join(' ')
    }

    return (
        <i className={buildIcon(name, type, size, fixedWidth, pulledIcon, rotate, border, animation, animationHover)}></i>
    )
}