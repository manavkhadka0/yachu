import { getImageUrl } from "./image";

export function generateOrganizationSchema(siteConfig: any, url: string = "https://yachu.com.np") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig?.meta_title || "Yachu Hair Oil",
    "url": url,
    "logo": getImageUrl(siteConfig?.primary_logo) || `${url}/logo.png`,
    "description": siteConfig?.meta_description || "Natural hair care products made in Nepal.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig?.contact_phone || "+977-9800000000",
      "contactType": "customer service",
      "email": siteConfig?.contact_email || "care@yachu.com.np",
      "areaServed": ["NP", "IN", "US", "UK", "AU"],
      "availableLanguage": ["English", "Nepali"]
    },
    "sameAs": [
      siteConfig?.facebook_link,
      siteConfig?.instagram_link,
      siteConfig?.tiktok_link
    ].filter(Boolean)
  };
}

export function generateFAQSchema(faqs: { q: string, a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export function generateProductSchema(product: any, url: string) {
  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price || 0;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": [
      getImageUrl(product.image1),
      product.image2 ? getImageUrl(product.image2) : undefined,
      product.image3 ? getImageUrl(product.image3) : undefined
    ].filter(Boolean),
    "description": (product.description || "").replace(/<[^>]*>/g, ""),
    "sku": product.id || product.slug,
    "brand": {
      "@type": "Brand",
      "name": "Yachu"
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "NPR",
      "price": price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2500"
    }
  };
}

export function generateItemListSchema(items: any[], listName: string, url: string, itemType: "Product" | "BlogPosting" = "Product", baseUrl: string = "https://yachu.com.np") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": url,
    "name": listName,
    "itemListElement": items.map((item, index) => {
      let itemUrl = `${baseUrl}/${itemType === "Product" ? "products" : "blog"}/${item.slug}`;
      
      const baseItem: any = {
        "@type": itemType,
        "name": item.title,
        "url": itemUrl,
        "image": itemType === "Product" ? getImageUrl(item.image1) : getImageUrl(item.thumbnail_image)
      };

      if (itemType === "Product") {
        const price = typeof item.price === "string" ? parseFloat(item.price) : item.price || 0;
        baseItem.offers = {
          "@type": "Offer",
          "priceCurrency": "NPR",
          "price": price,
          "url": itemUrl,
          "availability": "https://schema.org/InStock"
        };
        baseItem.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "2500"
        };
      }

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": baseItem
      };
    })
  };
}

export function generateArticleSchema(blog: any, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [
      getImageUrl(blog.thumbnail_image),
      getImageUrl(blog.cover_image)
    ].filter(Boolean),
    "datePublished": blog.created_at || blog.updated_at,
    "dateModified": blog.updated_at,
    "author": [{
      "@type": "Person",
      "name": blog.author?.name || "Yachu Expert",
      "url": "https://yachu.com.np/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Yachu Hair Oil",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yachu.com.np/logo.png" // Fallback logo
      }
    },
    "description": (blog.blog_content || "").replace(/<[^>]*>/g, "").substring(0, 160)
  };
}

export function generateBreadcrumbSchema(items: { name: string, item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.item
    }))
  };
}

export function generateWebPageSchema(title: string, description: string, url: string, type: string = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "description": description,
    "url": url
  };
}
