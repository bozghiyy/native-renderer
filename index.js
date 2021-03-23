// requirements for a native rendering function:
//
// - it must define a window.renderAd function that will be called by the Prebid Universal Creative
// - renderAd() must return a fully resolved and ready-to-display block of HTML that will be appended to the body
//
window.renderAd=function(data){
	let template = `
<style>
.native-ad {
  background-color: #fff;
  border: 1px solid #EDEDED;
  border-radius: 4px;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  height: 248px;
  width: 298px;
  position: relative;
}
.inset-box {
  border-radius: 2px;
  background-color: #fff;
  position: absolute;
  padding: 2px 5px;
}
.inset-box-text {
  display: block;
  height: 15px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #333333;
  text-decoration: none;
}
.attribution {
  left: 10px;
  top: 10px;
}
.image img {
  height: 158px;
  width: 298px;
  border-radius: 4px 4px 0 0;
  object-fit: cover;
}
.advertiser {
  width: 96px;
  right: 10px;
  top: 10px;
}
.title {
  height: 24px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.title a {
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  line-height: 25px;
  text-decoration: none;
}
.call-to-action {
  display: block;
  width: 77px;
  border-radius: 4px;
  background-color: #3E86C7;
  margin: 0 auto;
  padding: 8px 15.5px;
  text-align: center;
  text-decoration: none;
}
.call-to-action-text {
  height: 18px;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
  line-height: 17px;
}
</style>
<div class='native-ad'>
  <div class='attribution inset-box'>
    <span class='inset-box-text'>Ad</span>
  </div>
  <div class='image'>
    <a href='##hb_native_linkurl##' target='_blank'><img src='##hb_native_image##'></a>
  </div>
  <div class='advertiser inset-box'>
    <a id='native-brand' class='inset-box-text' href='##hb_native_linkurl##' target='_blank'>##hb_native_brand##</a>
  </div>
  <div class='title'>
    <a id='native-title' href='##hb_native_linkurl##' target='_blank'>##hb_native_title##</a>
  </div>
  <a class='call-to-action' href='##hb_native_linkurl##' target='_blank'>
    <span class='call-to-action-text'>Learn More</span>
  </a>
</div>`;
	const map = {
	    title: 'hb_native_title',
	    body: 'hb_native_body',
	    body2: 'hb_native_body2',
	    privacyLink: 'hb_native_privacy',
	    sponsoredBy: 'hb_native_brand',
	    image: 'hb_native_image',
	    icon: 'hb_native_icon',
	    clickUrl: 'hb_native_linkurl',
	    displayUrl: 'hb_native_displayurl',
	    cta: 'hb_native_cta',
	    rating: 'hb_native_rating',
	    address: 'hb_native_address',
	    downloads: 'hb_native_downloads',
	    likes: 'hb_native_likes',
	    phone: 'hb_native_phone',
	    price: 'hb_native_price',
	    salePrice: 'hb_native_saleprice'
	}
	for (var i = 0; i < data.length; i++){
		if (map[data[i].key]) {
			template = template.replaceAll("##"+map[data[i].key]+"##",data[i].value);
		}
	}
	return template;
}
