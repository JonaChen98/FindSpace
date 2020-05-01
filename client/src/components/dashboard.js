import React from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { Button, CardActionArea, CardActions, Typography, Card, CardContent } from '@material-ui/core';

const Dashboard = ({ data, cardsPerPage, totalCards, paginate, currentPage }) => {
  return(
    <div className="dashboard-content">
      <div className="row">
        <div className="btn-row">
          <Button variant="contained">Browse</Button>
          <Button variant="contained">Pending</Button>
          <Button variant="contained">Accepted</Button>
        </div>
        <div className="cards-container">
          {
            data.map((item) => {
              return(
                <Card key={item.id}>
                  <CardActionArea>
                    <CardContent>
                      <Typography>
                        name: {item.name},
                        <br />
                        id: {item.id},
                        <br />
                        email: {item.email},
                        <br/>
                        company: {item.company}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button>
                      Accept
                    </Button>
                    <Button>
                      Reject
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          }
        </div>
        <Pagination count={Math.floor(totalCards / cardsPerPage)} page={currentPage} onChange={paginate}/>
      </div>
    </div>
  ); 
}

export default Dashboard;