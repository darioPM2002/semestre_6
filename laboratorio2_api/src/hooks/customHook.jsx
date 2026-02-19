import { useFetch } from './useFetch';
import { useCounter } from './userCounter';
import Loading from '../components/loading';
import Card from '../components/card';

export const CustomHook = () => {
  const { counter, decrement, increment } = useCounter(1);
  const { data, isLoading } = useFetch(
    `https://images-api.nasa.gov/search?media_type=image&page=${counter}`
  );

  const item = data?.collection?.items?.[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: 'black' }}>Imágenes NASA</h1>
      <hr style={{ width: '100%' }} />

      {isLoading ? (
        <Loading />
      ) : (
        item && (
          <Card
            id={item.data[0].nasa_id}
            name={item.data[0].title}
            sprites={[item.links?.[0]?.href]}
          />
        )
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button className='btn btn-outline-light' onClick={() => decrement()}>
          ← Anterior
        </button>
        <button className='btn btn-outline-light' onClick={() => increment()}>
          Siguiente →
        </button>
      </div>
    </div>
  );
};