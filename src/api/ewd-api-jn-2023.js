export const apiAddReview = (movieId, movie, author, content, rating) => {
    return fetch('/api/reviews', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ movieId: movieId, movie: movie, author: author, content: content, rating: rating })
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getApiMovieReviews = (movieId) => {
    return fetch(
        `/api/reviews/${movieId}/movie`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then((res) => res.json());
};

// Get Popular Actors

export const getPopularActors = () => {
    return fetch(
        `/api/actors`
    ).then((res) => res.json());
};

export const getMovies = () => {
    return fetch(
        `/api/movies`
    ).then((res) => res.json());
};

export const getMovie = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `/api/movie/${id}`, {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        }
    }
    ).then((res) => res.json());
};


export const signup = (email, password, firstName, lastName) => {
    console.log("into the signup api");
    console.log("Here is data - " + JSON.stringify(email));
    console.log("Here is data - " + JSON.stringify(password));
    console.log("Here is data - " + JSON.stringify(firstName));
    console.log("Here is data - " + JSON.stringify(lastName));

    return fetch('/api/accounts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    }).then(res => res.json())
};

export const login = (email, password) => {
    return fetch('/api/accounts/security/token', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password })
    }).then(res => res.json())
};

