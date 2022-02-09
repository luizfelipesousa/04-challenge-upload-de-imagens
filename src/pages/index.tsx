import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface imageProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type Response = {
  data: imageProps[];
  after: string;
};

const fetchImages = async (pageParam): Promise<Response> => {
  const response = await api.get(`/api/images`, {
    params: {
      after: pageParam,
    },
  });
  return response.data;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    ({ pageParam = null }) => fetchImages(pageParam),

    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.after;
      },
    }
  );

  const formattedData: imageProps[] = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const pagesFormatted = data
      ? data.pages
          .map(page => {
            return page.data;
          })
          .flat()
      : [];

    return pagesFormatted;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button py={4} mt={8} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
