import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({data,open,handleClose}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Resource
            </Typography>
          </Toolbar>
        </AppBar>
        {data && 
            <Container>
            <h3>Word</h3>
            <p>{data.id}</p>
            <Divider />
            <h3>Provider</h3>
            <p>{data.metadata && data.metadata.provider}</p>
            <Divider />
            <h3>Language</h3>
            <p>{data.results && data.results[0].language}</p>
            <Divider />
            <h3>Lexical Entries</h3>
            {data.results && data.results.map(item=>(
                <div>
                    {item.lexicalEntries.map(i=>(
                        <div>
                            <p>Category : {i.lexicalCategory.text}</p>
                            <a href={i.entries[0].pronunciations[0].audioFile}><VolumeUpIcon /></a>
                        </div>
                    ))}
                </div>
            ))}
            </Container>
        }
        
      </Dialog>
    </div>
  );
}
