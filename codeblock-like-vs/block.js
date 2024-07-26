(function(){
    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var RichText = wp.blockEditor.RichText;
  
    wp.blocks.registerBlockType( 
        'gutenberg-custom-blocks/codeblock-like-vs', 
        //ここからブロックの情報を登録していく
        {
            title: 'コードブロック',
            icon: 'text',
            description:'ファイル名をブロック上部に表示できるコードブロックです',
            category: 'text',
            example:{},
            attributes: {
                filename: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'pre',
                    attribute: 'data-file'
                },
                language: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'code',
                    attribute: 'class'
                },
                code: {
                    type: 'string',
                    source: 'html',
                    selector: 'code'
                }
            },
            edit: function(props){
                var blockProps = useBlockProps(
                    {
                        className: 'codeEditArea_wrapper',
                        style: {
                            backgroundColor: '#27343B',
                            padding: '10px'
                        }
                    }
                );
                return el(
                    'div',
                    blockProps,
                    [
                        el(
                            RichText,
                            {
                                tagName: 'p',
                                value: props.attributes.filename,
                                style: {
                                    color: '#FFFFFF',
                                },
                                placeholder: 'ファイル名があれば入力してください',
                                onChange: function(newFilename){
                                    props.setAttributes({filename: newFilename});
                                } 
                            }
                        ),
                        el(
                            RichText,
                            {
                                tagName: 'p',
                                value: props.attributes.language,
                                style: {
                                    color: '#FFFFFF',
                                },
                                placeholder: 'プログラミング言語名を入力してください',
                                onChange: function(newLanguage){
                                    props.setAttributes({language: newLanguage});
                                }
                            }
                        ),
                        el(
                            RichText,
                            {
                                tagName: 'div',
                                value: props.attributes.code,
                                style: {
                                    color: '#FFFFFF',
                                },
                                placeholder: 'コードを入力してください',
                                preserveWhiteSpace: true,
                                onChange: function(newCode){
                                    props.setAttributes({code: newCode});
                                }
                            }
                        )
                    ]
                );
            },
            save: function(props){ 
                var blockProps = useBlockProps.save({className: 'hljs-wrap'});
                return el(
                    'div',
                    blockProps,
                    el(
                        'pre',
                        {
                            'data-file': props.attributes.filename
                        },
                        el(
                            RichText.Content,
                            {
                                tagName: 'code',
                                className: props.attributes.language,
                                value: props.attributes.code
                            }
                        )
                    )
                );
            }
        }
        
    );
}(wp));