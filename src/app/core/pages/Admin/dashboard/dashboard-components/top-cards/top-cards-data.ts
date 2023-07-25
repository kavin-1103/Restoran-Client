export interface topcard {
    bgcolor: string,
    icon: string,
    total: string,
    subtitle: string
}



export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        total: '',
        subtitle: 'Total Customers'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-table',
        total: '',
        subtitle: 'Total Dinings'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        total: '',
        subtitle: 'Total Food Items'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        total: '',
        subtitle: 'Total Orders'
    },

] 


