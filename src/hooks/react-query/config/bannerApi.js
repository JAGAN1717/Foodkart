import MainApi from '../../../api/MainApi'

export const BannerApi = {
    bannerList: () => MainApi.get('/api/v1/banners'),
    bannerSliderList: () => MainApi.get('/api/v1/home-page-slider'),
    chefSliderList: () => MainApi.get('/api/v1/home-chef-page-slider'),
    partnerSliderList: () => MainApi.get('/api/v1/delivery-partner-page-slider'),
}