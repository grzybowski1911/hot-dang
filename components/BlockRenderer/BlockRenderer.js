import { CallToActionButton } from "components/CallToActionButton/CallToActionButton";
import { Column } from "components/Column/Column";
import { Columns } from "components/Columns/Columns";
import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph/Paragraph";
import { PropertySearch } from "components/PropertySearch";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({ blocks }) => {
    console.log("BLOCKS: ", blocks)
    return blocks.map((block) => {
        switch(block.name) {
            case "core/cover": {
                return (
                    <Cover key={block.id} background={block.attributes.url}> 
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Cover>
                )
            }
            case "core/post-title":
            case "core/heading": {
                return <Heading key={block.id} textAlign={block.attributes.textAlign} content={block.attributes.content} level={block.attributes.level}/>
            }
            case "core/paragraph": {
                return <Paragraph key={block.id} textAlign={block.attributes.align} content={block.attributes.content} textColor={theme[block.attributes.textColor] || block.attributes.style?.color.text}/>
            }
            case "acf/ctabutton": {
                return <CallToActionButton key={block.id} buttonLabel={block.attributes.data.label} destination={block.attributes.data.destination} align={block.attributes.data.align} />
            }
            case "acf/propertysearch": {
                return <PropertySearch key={block.id} />
            }
            case "core/columns": {
                return <Columns key={block.id} isStackedOnMobile={block.attributes.isStackedOnMobile}>
                    <BlockRenderer blocks={block.innerBlocks} />
                </Columns>
            }
            case "core/column": {
                return <Column key={block.id}>
                    <BlockRenderer blocks={block.innerBlocks} />
                </Column>
            } case "core/image": {
                return <Image key={block.id} src={block.attributes.url} height={block.attributes.height} width={block.attributes.width} alt={block.attributes.alt} />
            }
            case "core/block":
            case "core/group": {
                return <BlockRenderer blocks={block.innerBlocks} key={block.id} />
            }
            default: {
                console.log('UNKNOWN: ', block);
            }
        }
    });
}