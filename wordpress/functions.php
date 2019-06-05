<?php
/**
 * Twenty Seventeen Child functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen_Child
 * @since 1.0
 */

/*
 * 20190602:修改rest post response
*/
function twentyseventeen_child_rest_prepare_post($data,$post,$request){
    $_data=$data->data;
	$_data['thumbnailurl']='';
	
    if(has_post_thumbnail()){
		
	  $_data['thumbnailurl']=get_the_post_thumbnail_url($post,'post-thumbnail');
	}
	else{
      //20190603:如无缩略图，获取post第一个图片
      preg_match_all( '/class=[\'"].*?wp-image-([\d]*)[\'"]/i', $post->post_content, $matches );
      if( $matches && isset($matches[1]) && isset($matches[1][0]) ){  
        $image_id = $matches[1][0];
        if($image_url = get_post_image_url($image_id)){
            $_data['thumbnailurl']=$image_url;
        }
      }
	  
	  if(!$_data['thumbnailurl'])
	  {
        preg_match_all('|<img.*?src=[\'"](.*?)[\'"].*?>|i', do_shortcode($post_content), $matches);
        if( $matches && isset($matches[1]) && isset($matches[1][0]) ){     
          $_data['thumbnailurl']=$matches[1][0];

        }
	  }

	}
    $data->data=$_data;
    return $data;	
}
add_filter( 'rest_prepare_post', 'twentyseventeen_child_rest_prepare_post',10,3);

//获取文章图片的地址
function get_post_image_url($image_id, $size='full'){
    if($thumb = wp_get_attachment_image_src($image_id, $size)){
        return $thumb[0];
    }
    return false;   
}
