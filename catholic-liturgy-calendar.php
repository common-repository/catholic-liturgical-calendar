<?php
/*
Plugin Name: Catholic Liturgy Calendar
Plugin URI: http://www.vercalendario.info/en/about/extensions/wordpress/install.html#cathlit
Description: This extension displays an animation with the current date on the roman catholic liturgical year. The animation contains links to mass lectures and the saints calendar online.
Version: 0.0.4
Author: www.vercalendario.info
Author URI: http://www.vercalendario.info/en/
License: http://www.gnu.org/licenses/gpl-2.0.html
*/
/*  Copyright 2013  www.vercalendario.info  (email : info@vercalendario.info)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class CATHOLIC_LITURGY_CALENDAR extends WP_Widget {

  //START Thanks to ziggy for yet another code suggestion!
  function __construct() {
  //END
     /* Widget settings. */
    $widget_ops = array(
      'classname' => 'cathlit',
      'description' => 'This extension shows you an animated version of the Roman Catholic liturgical cycle in which you can learn the liturgical times, their length and corresponding Gregorian dates.');

     /* Widget control settings. */
    $control_ops = array(
       'width' => 250,
       'height' => 250,
       'id_base' => 'cathlit-widget');

    /* Create the widget. */
   //$this->WP_Widget('cathlit-widget', 'Catholic Liturgy Calendar', $widget_ops, $control_ops );
    parent::__construct(
      'cathlit-widget',
      'Catholic Liturgy Calendar',
      $widget_ops,
      $control_ops
     ); 
  }

  function escapestring($str){
      return str_replace(array("javascript","script","<",">"), "", $str);
  }
  
  function form ($instance) {
    /* Set up some default widget settings. */
    $defaults = array('radius' => '200','title'=>'');
    $instance = wp_parse_args( (array) $instance, $defaults ); ?>

  <p>
    <label for="<?php echo $this->get_field_id('title'); ?>">Title:</label>
    <input type="text" name="<?php echo ($this->get_field_name('title')) ?>" id="<?php echo $this->get_field_id('title') ?> " value="<?php echo $this->escapestring($instance['title']) ?>">
  </p>

  <p>
    <label for="<?php echo $this->get_field_id('radius'); ?>">Radius of Cicle:</label>
    <input type="text" name="<?php echo $this->get_field_name('radius') ?>" id="<?php echo $this->get_field_id('radius') ?> " value="<?php echo $this->escapestring($instance['radius']) ?>">
  </p>
  
  <?php
}

function update ($new_instance, $old_instance) {
  $instance = $old_instance;

  $instance['title'] = $this->escapestring($new_instance['title']);
  $instance['radius'] = $this->escapestring($new_instance['radius']);

  return $instance;
}

function widget ($args,$instance) {
   extract($args);

  $title = $this->escapestring($instance['title']);
  $radius = $this->escapestring($instance['radius']);
  if(!is_numeric($radius)){
      $radius=200;
  }
  

  $out='
    <div>
        <div id="cathlitgadgetd"></div>
        <div id="cathlits"></div>
        
        <script type="text/javascript">
            function cathlit_getradius(){
                return '.$radius.';
            }
            var ss = document.createElement("script");
                ss.type = "text/javascript";
                ss.src= "'.plugins_url( 'js/popup.js' , __FILE__ ).'";
            document.getElementsByTagName("head")[0].appendChild(ss);
        </script>
    </div>
      ';

  //print the widget for the sidebar
  echo $before_widget;
  echo $before_title.$title.$after_title;
  echo $out;
  echo $after_widget;
 }
}

function cathlit_load_widget() {
  register_widget('CATHOLIC_LITURGY_CALENDAR');
}

add_action('widgets_init', 'cathlit_load_widget');

   /**
    * Enqueue plugin style-file
    */
   function cathlit_add_my_scripts() {
       
    $lang=get_locale();
    $lang=$lang[0].$lang[1];

       // Respects SSL, Style.css is relative to the current file
       wp_register_style( 'cathlit-style', plugins_url('css/svgly.css', __FILE__) );
       wp_enqueue_style( 'cathlit-style' );
       
       // create array of all scripts
        $scripts=array('custom-script'=>'/js/compatibility.js',
                      'custom-script1'=>'/js/_locales/'.$lang.'/messages.js',
                      'custom-script2'=>'/js/svgly.js');
        foreach($scripts as $key=>$sc){
            wp_register_script($key, plugins_url($sc, __FILE__) );
            wp_enqueue_script($key);
        }
   }

  /**
    * Register with hook 'wp_enqueue_scripts', which can be used for front end CSS and JavaScript
    */
   add_action( 'wp_enqueue_scripts', 'cathlit_add_my_scripts' );
?>