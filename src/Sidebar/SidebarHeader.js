import React, {Fragment} from "react";
import Typography from '@material-ui/core/Typography';
function SidebarHeader(props){

	return (
			<Fragment>
			  <div className={'sidebarTitle'}>
			      <Typography variant="h6" component="h6">
			        	{props.title}
			      </Typography>
		      </div>
		     { props.titleDescription && <div className={'sidebarTitleDescription'}>
		      		Overall test attempted <span className={'countClass'}> { props.testAttmptsCount } </span>  times and it's average results
		      </div>}		      
			</Fragment>
		)
}

export default SidebarHeader;
