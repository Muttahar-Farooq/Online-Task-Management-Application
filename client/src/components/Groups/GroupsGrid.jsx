import React, {useEffect} from 'react'
import TopBar from '../TopBar'
import GroupsCard from './GroupsCard'
import { Grid, Container } from '@mui/material';
import useStore from '../../store/store';
import GroupsForm from './GroupsForm';
import AlertBox from '../AlertBox';

const heading = "Groups";
const desc = "Here you can view all your groups!";

const GroupsGrid = () => {

  useEffect(() => {
    useStore.getState().fetchGroups();
  }, []);

  const groups = useStore((state) => state.groups);

  const handleOpenForm = () => {
    useStore.setState({isEditForm: false});
    useStore.setState({openGroupForm: true});
  };

  return (
    
    <>
        <TopBar heading={heading} desc={desc} primaryBtnName={"Create a new Group"} handlePrimaryBtn={()=>handleOpenForm()} />
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {groups.map((group) => (<GroupsCard groupId={group._id} heading={group.name} desc={group.description} />))}
            </Grid>
        </Container>
        <GroupsForm/>
        <AlertBox/>
    </>
    
  )
}

export default GroupsGrid