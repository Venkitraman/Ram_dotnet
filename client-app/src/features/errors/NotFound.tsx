import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder textAlign="center">
            <Header icon>
                <Icon name="search" />
                Oops - We couldn't find what you're looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to Activities Page
                </Button>
            </Segment.Inline>
        </Segment>
    );
}
