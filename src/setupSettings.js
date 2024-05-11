import LanguageService from './service/LanguageService'
import LimitService from './service/LimitService'
import ThemeService from './service/ThemeService'
import RateService from './service/RateService'

export default function setupSettings() {
    LanguageService.setup()
    LimitService.setup()
    ThemeService.setup()
    RateService.setup()
}