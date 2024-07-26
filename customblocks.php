<?php
/*
Plugin Name: MyGutenbergCustomBlocks 
Description: オリジナルのGutenbergカスタムブロック導入用プラグイン
Author: navifolio.com
*/

function enqueue_syntaxHighlight_script(){
    wp_enqueue_script(
        'highlight-js',
        plugin_dir_url( __FILE__ ) . '/codeblock-like-vs/library/js/highlight.min.js',
        [], '11.7.0', true
    );
    wp_enqueue_script(
        'syntax-highlight-command',
        plugin_dir_url( __FILE__ ) . '/codeblock-like-vs/library/js/syntax-highlight.js',
        [], '1.0', true
    );
    wp_enqueue_style(
        'github-min-css',
        plugin_dir_url( __FILE__ ) . '/codeblock-like-vs/library/css/github.min.css',
        [],'',''
    );
    wp_enqueue_script(
        'codeblock-like-vs-block-style-js',
        plugin_dir_url( __FILE__ ) . '/codeblock-like-vs/codeblock-like-vs-style.js',
        array('highlight-js','syntax-highlight-command'),
        '1.0', true
    );
    wp_enqueue_style(
        'codeblock-like-vs-block-style-css',
        plugin_dir_url( __FILE__ ) . '/codeblock-like-vs/codeblock-like-vs-style.css',
        array(),'',''
    );
}

function colab_link_card_style(){
   wp_enqueue_script(
        'colab-link-card-block-style-js',
        plugin_dir_url( __FILE__ ) . '/colab-link-card/colab-link-card-style.js',
        array(),'',true
    );
    wp_enqueue_style(
        'colab-link-card-block-style-css',
        plugin_dir_url( __FILE__ ) . '/colab-link-card/colab-link-card-style.css',
        array(),'',''
    );
}

function download_btn_style(){
    wp_enqueue_script(
        'download-btn-style-js',
        plugin_dir_url( __FILE__ ) . '/download-btn/download-btn-style.js',
        array(),'',true
    );
    wp_enqueue_style(
        'download-btn-style-css',
        plugin_dir_url( __FILE__ ) . '/download-btn/download-btn-style.css',
        array(),'',''
    );
}

function add_custom_blocks(){
    //codeblock-like-vs
    wp_enqueue_script(
        'import_custom_codeblock_like_vs',
        plugins_url('/codeblock-like-vs/block.js', __FILE__),
        array('wp-blocks', 'wp-element')
    );
    //colab-link-card
    wp_enqueue_script(
        'import_link_card_to_colab',
        plugin_dir_url( __FILE__ ) . '/colab-link-card/block.js',
        array('wp-blocks', 'wp-element')
    );
    //download-btn
    wp_enqueue_script(
        'import_download_btn',
        plugin_dir_url( __FILE__ ) . '/download-btn/block.js',
        array('wp-blocks', 'wp-element')
    );
}

add_action('wp_enqueue_scripts', 'enqueue_syntaxHighlight_script');
add_action('wp_enqueue_scripts', 'colab_link_card_style');
add_action('wp_enqueue_scripts', 'download_btn_style');
add_action('enqueue_block_editor_assets', 'add_custom_blocks');
?>
