import React from 'react';
import { CircularProgress, Container, Typography } from "@mui/material";
import { useGetAllNewsByCategoriesQuery } from "../stores/Features/api/apiSlice";
import Carousel from "react-material-ui-carousel";

import Box from '@mui/material/Box';
import {Link} from "react-router-dom";

function HomepageHeader(props) {
    const {
        data: allNewsByCategories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllNewsByCategoriesQuery({categories: "general, tech"})

    let content

    if (isLoading) {
        content = <CircularProgress text="Loading..." />
    } else if (isSuccess) {
        content = allNewsByCategories.data.map(news => {
            return container(news)
        })
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <Carousel autoPlay={true}>
            {content}
        </Carousel>
    );
}

const container = (news) => {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                height: "600px",
                alignItems: "flex-end",
                backgroundImage: `url(${news.image_url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <Box
                sx={{
                    width: 3/4,
                    backgroundColor : 'rgba(0, 0, 0, 0.8)',
                    p : '20px',
                }}
            >
                <Typography variant="h4">TODAY's TOP NEWS</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        typography: 'h2',
                        '& > :not(style) + :not(style)': {
                            ml: 2,
                        },
                        fontWeight: 'bold',
                    }}
                >
                    <Link className={"RouterLink"} to={`/news/${news.uuid}`}>
                        {news.title}
                    </Link>
                </Box>
                <Box sx={{ display : "flex" }}>
                    {news.categories.map(value => {
                        return (
                            <Typography
                                variant="caption"
                                sx={{
                                    textTransform: "uppercase",
                                    marginRight: "0.5rem",
                                    color : '#e2e8f0'
                                }}
                            >
                                {value}
                            </Typography>
                        )
                    })}
                </Box>
            </Box>
        </Container>
    )
}

export default HomepageHeader;