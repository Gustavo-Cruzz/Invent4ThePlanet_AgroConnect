// Theme composable – injects CSS custom properties on :root based on user profile

const themes = {
    produtor: {
        '--theme-primary': '#2E7D32',
        '--theme-primary-light': '#A5D6A7',
        '--theme-primary-50': '#E8F5E9',
        '--theme-primary-100': '#C8E6C9',
        '--theme-primary-600': '#2E7D32',
        '--theme-primary-700': '#1B5E20',
        '--theme-gradient-from': '#2E7D32',
        '--theme-gradient-to': '#1B5E20',
        '--theme-badge-bg': '#E8F5E9',
        '--theme-badge-text': '#1B5E20',
    },
    varejista: {
        '--theme-primary': '#E65100',
        '--theme-primary-light': '#FFCC80',
        '--theme-primary-50': '#FFF3E0',
        '--theme-primary-100': '#FFE0B2',
        '--theme-primary-600': '#E65100',
        '--theme-primary-700': '#BF360C',
        '--theme-gradient-from': '#E65100',
        '--theme-gradient-to': '#BF360C',
        '--theme-badge-bg': '#FFF3E0',
        '--theme-badge-text': '#BF360C',
    },
    beneficiador: {
        '--theme-primary': '#1565C0',
        '--theme-primary-light': '#90CAF9',
        '--theme-primary-50': '#E3F2FD',
        '--theme-primary-100': '#BBDEFB',
        '--theme-primary-600': '#1565C0',
        '--theme-primary-700': '#0D47A1',
        '--theme-gradient-from': '#1565C0',
        '--theme-gradient-to': '#0D47A1',
        '--theme-badge-bg': '#E3F2FD',
        '--theme-badge-text': '#0D47A1',
    },
    transportador: {
        '--theme-primary': '#5E35B1',
        '--theme-primary-light': '#B39DDB',
        '--theme-primary-50': '#EDE7F6',
        '--theme-primary-100': '#D1C4E9',
        '--theme-primary-600': '#5E35B1',
        '--theme-primary-700': '#4527A0',
        '--theme-gradient-from': '#5E35B1',
        '--theme-gradient-to': '#4527A0',
        '--theme-badge-bg': '#EDE7F6',
        '--theme-badge-text': '#4527A0',
    },
}

const profileMeta = {
    produtor: { label: 'Produtor', icon: '🌾' },
    varejista: { label: 'Varejista', icon: '🛒' },
    beneficiador: { label: 'Beneficiador', icon: '🏭' },
    transportador: { label: 'Transportador', icon: '🚛' },
}

export function useTheme() {
    function applyTheme(userType) {
        const vars = themes[userType]
        if (!vars) return
        const root = document.documentElement
        Object.entries(vars).forEach(([prop, val]) => {
            root.style.setProperty(prop, val)
        })
    }

    function clearTheme() {
        const root = document.documentElement
        Object.keys(themes.produtor).forEach((prop) => {
            root.style.removeProperty(prop)
        })
    }

    function getProfileMeta(userType) {
        return profileMeta[userType] || { label: userType, icon: '👤' }
    }

    return { applyTheme, clearTheme, getProfileMeta, themes, profileMeta }
}
