import { AddForm } from '@/components/add-form';
import { UsersList } from '@/components/users-list';
import { Suspense } from 'react'

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Suspense fallback={<p>Loading users...</p>}>
        <UsersList/>
      </Suspense>

      <section className="mt-10">
        <AddForm />
      </section>

      <section>
				{children}
			</section>
		</section>
  );
}
