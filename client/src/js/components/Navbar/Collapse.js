import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/cards/RecipeReviewCard.js

export default function Collapsed() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
            >
          <ExpandMoreIcon />
        </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography gutterBottom variant="h5"> Edit Profile </Typography>

        </Collapse>
        </div>
    )
}
