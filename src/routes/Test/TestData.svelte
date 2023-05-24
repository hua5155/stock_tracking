<script context="module" lang="ts">
	import { z } from 'zod';

	const dummyBasicSchema = z.object({
		productBrand: z.string(),
		productName: z.string(),
		productCategory: z.string()
	});
	const formVariant = z.object({
		variant: z.string(),
		price: z.number(),
		stock: z.number()
	});
	const dataVariant = z.object({
		variants: z.array(formVariant)
	});
	const dummyDataSchema = dummyBasicSchema.merge(dataVariant);
	const dummyFormSchema = dummyBasicSchema.merge(formVariant);
	export type dummyDataType = z.infer<typeof dummyDataSchema>;
	export type dummyFormType = z.infer<typeof dummyFormSchema>;

	export const dummyData: dummyDataType[] = [
		{
			productBrand: 'KENDA',
			productName: 'Tube',
			productCategory: 'Bicycle tube',
			variants: [
				{
					variant: '26x1.75 AV',
					price: 200,
					stock: 0
				},
				{
					variant: '700x21c FV',
					price: 250,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Continental',
			productName: 'Competition',
			productCategory: 'Bicycle tire',
			variants: [
				{
					variant: '700x21c',
					price: 500,
					stock: 0
				},
				{
					variant: '700x23c',
					price: 500,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Michelin',
			productName: 'PS4',
			productCategory: 'Car tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Michelin',
			productName: 'Cup 2 R',
			productCategory: 'Car tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Continental',
			productName: 'PremiumContact 7',
			productCategory: 'Car tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Continental',
			productName: 'SportContact 7',
			productCategory: 'Car tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'P Zero',
			productCategory: 'Car tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'Corsa II',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'Supercorsa SP v4',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'Supercorsa SC1 v4',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'Supercorsa SC2 v4',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'Supercorsa SC3 v4',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Michelin',
			productName: 'Power 5',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Michelin',
			productName: 'Power Cup 2',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'Supercorsa TD',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Pirelli',
			productName: 'Rosso Scooter',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: '110/70R12 F',
					price: 0,
					stock: 0
				},
				{
					variant: '120/70R12 R',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Bridgestone',
			productName: 'R11',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Bridgestone',
			productName: 'RS11',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Bridgestone',
			productName: 'RS10',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		},
		{
			productBrand: 'Bridgestone',
			productName: 'S22',
			productCategory: 'Motorcycle tire',
			variants: [
				{
					variant: 'placeholder',
					price: 0,
					stock: 0
				}
			]
		}
	];
</script>
