import { MainMenu } from "components/MainMenu";
import { BlockRenderer } from "components/BlockRenderer";

export const Page = (props) => {
    return <div>
                <MainMenu items={props.mainMenuItems} ctaLabel={props.ctaLabel} ctaDestination={props.ctaDestination} />
                <BlockRenderer blocks={props.blocks}/>
            </div>;
}