
<?php
/**
 * Enque the stylesheet from the parent
 */
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}




/**
 * Register New widget for the newsletter
 */
function newsletter_widget_init() {

    register_sidebar( array(
        'name'          => 'Newsletter Widget Area',
        'id'            => 'newsletter_widget_area',
        'before_widget' => '<div class="newsletter_widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="newsletter_widget_title">',
        'after_title'   => '</h2>',
    ) );

}
add_action( 'widgets_init', 'newsletter_widget_init' );
?>