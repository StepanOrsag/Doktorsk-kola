import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postApi';
import { useCategories } from '../hooks/useCategories';
import type { PostType, PaymentType } from '../types/post';

export function CreatePostPage() {
  const navigate = useNavigate();
  const { categories, loading: catsLoading } = useCategories();

  const [name, setName] = useState('');
  const [postType, setPostType] = useState<PostType>('OFFERHELP');
  const [description, setDescription] = useState('');
  const [paymentType, setPaymentType] = useState<PaymentType>('FREE');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Vyberte prosím kategorii.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createPost({
        name,
        postType,
        description,
        paymentType,
        category: { postCategoryId: Number(categoryId), name: '', isDefault: false }, // Backend usually only needs the ID
        email,
        phone,
      });
      if (postType === 'OFFERHELP') navigate('/nabidka-pomoci');
      else if (postType === 'SEEKHELP') navigate('/poptavka-pomoci');
      else navigate('/nabidka-spoluprace');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', padding: '0 1rem', paddingBottom: '2rem' }}>
      <h2>Přidat nový příspěvek</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="name" style={{ fontWeight: 600 }}>Název *</label>
          <input 
            id="name" 
            type="text" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <label htmlFor="postType" style={{ fontWeight: 600 }}>Typ příspěvku *</label>
            <select 
              id="postType" 
              value={postType} 
              onChange={(e) => setPostType(e.target.value as PostType)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              <option value="OFFERHELP">Nabídka pomoci</option>
              <option value="SEEKHELP">Poptávka pomoci</option>
              <option value="OFFERCOLLABORATION">Nabídka spolupráce</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <label htmlFor="categoryId" style={{ fontWeight: 600 }}>Kategorie *</label>
            <select 
              id="categoryId" 
              required
              value={categoryId} 
              onChange={(e) => setCategoryId(Number(e.target.value))}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
              disabled={catsLoading}
            >
              <option value="" disabled>Vyberte kategorii...</option>
              {categories.map(cat => (
                <option key={cat.postCategoryId} value={cat.postCategoryId}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="paymentType" style={{ fontWeight: 600 }}>Typ platby *</label>
          <select 
            id="paymentType" 
            value={paymentType} 
            onChange={(e) => setPaymentType(e.target.value as PaymentType)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          >
            <option value="FREE">Zdarma</option>
            <option value="PAID">Placené</option>
            <option value="AGREEMENT">Dohodou</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="description" style={{ fontWeight: 600 }}>Podrobný popis *</label>
          <textarea 
            id="description" 
            required 
            rows={5}
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <label htmlFor="email" style={{ fontWeight: 600 }}>E-mail</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <label htmlFor="phone" style={{ fontWeight: 600 }}>Telefon</label>
            <input 
              id="phone" 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              backgroundColor: '#1d4ed8', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontWeight: 600
            }}
          >
            {isSubmitting ? 'Ukládám...' : 'Přidat příspěvek'}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            style={{ 
              backgroundColor: '#e5e7eb', 
              color: '#374151', 
              padding: '0.75rem 1.5rem', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Zrušit
          </button>
        </div>

      </form>
    </div>
  );
}
